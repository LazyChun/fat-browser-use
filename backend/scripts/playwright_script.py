from __future__ import annotations

import asyncio
import base64
import subprocess
import sys
import threading
from typing import Any, Awaitable, Dict, List, Literal, Optional, TypeVar


_playwright: Any = None
_browser: Any = None
_selector_event = threading.Event()
_selector_result: Dict[str, Any] = {"selector": None}
_sessions: Dict[str, Dict[str, Any]] = {}

T = TypeVar("T")
_loop: Optional[asyncio.AbstractEventLoop] = None
_loop_thread: Optional[threading.Thread] = None
_loop_ready = threading.Event()


def _ensure_loop() -> asyncio.AbstractEventLoop:
    global _loop, _loop_thread

    if _loop is not None and _loop_thread is not None and _loop_thread.is_alive():
        return _loop

    def _runner() -> None:
        if sys.platform == "win32":
            asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        globals()["_loop"] = loop
        _loop_ready.set()
        loop.run_forever()

    _loop_ready.clear()
    _loop_thread = threading.Thread(target=_runner, name="PlaywrightScriptLoop", daemon=True)
    _loop_thread.start()
    _loop_ready.wait(timeout=10)
    if _loop is None:
        raise RuntimeError("Failed to start playwright script loop")
    return _loop


def _run(coro: Awaitable[T]) -> T:
    loop = _ensure_loop()
    fut = asyncio.run_coroutine_threadsafe(coro, loop)
    return fut.result()


def get_version() -> str:
    try:
        from importlib.metadata import version as pkg_version
    except Exception:
        from importlib_metadata import version as pkg_version  # type: ignore

    return pkg_version("playwright")


def install_browsers(
    browser: Literal["chromium", "firefox", "webkit"] = "chromium",
) -> Dict[str, Any]:
    proc = subprocess.run(
        [sys.executable, "-m", "playwright", "install", browser],
        capture_output=True,
        text=True,
    )
    return {
        "returncode": int(proc.returncode),
        "stdout": proc.stdout,
        "stderr": proc.stderr,
    }


def fetch_html(
    url: str,
    wait_until: Literal["load", "domcontentloaded", "networkidle"] = "domcontentloaded",
    timeout_ms: int = 30000,
    user_agent: Optional[str] = None,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        from playwright.async_api import async_playwright

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context_args: Dict[str, Any] = {}
            if user_agent:
                context_args["user_agent"] = user_agent
            context = await browser.new_context(**context_args)
            page = await context.new_page()
            try:
                await page.goto(url, wait_until=wait_until, timeout=int(timeout_ms))
                html = await page.content()
                return {"html": html}
            finally:
                try:
                    await page.close()
                except Exception:
                    pass
                try:
                    await context.close()
                except Exception:
                    pass
                try:
                    await browser.close()
                except Exception:
                    pass

    return _run(_do())


def screenshot_base64(
    url: str,
    full_page: bool = True,
    timeout_ms: int = 30000,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        from playwright.async_api import async_playwright

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context()
            page = await context.new_page()
            try:
                await page.goto(url, wait_until="domcontentloaded", timeout=int(timeout_ms))
                png_bytes = await page.screenshot(full_page=bool(full_page), type="png")
                return {"image_base64": base64.b64encode(png_bytes).decode("ascii"), "format": "png"}
            finally:
                try:
                    await page.close()
                except Exception:
                    pass
                try:
                    await context.close()
                except Exception:
                    pass
                try:
                    await browser.close()
                except Exception:
                    pass

    return _run(_do())


def _selector_on_selected(selector: str) -> None:
    _selector_result["selector"] = selector
    _selector_event.set()


def _get_selector_js_injection() -> str:
    return """
    (function() {
        const init = () => {
            if (document.getElementById('fat-notes-selector-info')) {
                return;
            }

            // --- Styles ---
            const style = document.createElement('style');
            style.innerHTML = `
                .fat-notes-selector-highlight {
                    outline: 2px solid #1677ff !important;
                    cursor: crosshair !important;
                    background-color: rgba(22, 119, 255, 0.1) !important;
                    z-index: 2147483646 !important;
                }
                .fat-notes-selector-selected-1 {
                    outline: 2px dashed #52c41a !important;
                    background-color: rgba(82, 196, 26, 0.1) !important;
                }
                #fat-notes-selector-info {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 12px 16px;
                    background-color: #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    border-radius: 6px;
                    z-index: 2147483647;
                    font-size: 14px;
                    color: #333;
                    font-family: system-ui, -apple-system, sans-serif;
                    border: 1px solid #e8e8e8;
                    pointer-events: none;
                    transition: all 0.3s;
                    max-width: 300px;
                }
                #fat-notes-selector-info.success {
                    border-color: #52c41a;
                    background-color: #f6ffed;
                }
                .fat-key {
                    display: inline-block;
                    padding: 2px 6px;
                    background: #f5f5f5;
                    border: 1px solid #d9d9d9;
                    border-radius: 4px;
                    font-size: 12px;
                    margin: 0 2px;
                    font-family: monospace;
                }
            `;
            document.head.appendChild(style);

            // --- UI ---
            const infoBox = document.createElement('div');
            infoBox.id = 'fat-notes-selector-info';
            infoBox.innerHTML = `
                <div style="font-weight:600;margin-bottom:4px">Element Selector</div>
                <div id="fat-selector-status">
                    Hold <span class="fat-key">Ctrl</span> to select single<br>
                    Hold <span class="fat-key">Shift</span> to select similar
                </div>
            `;
            document.body.appendChild(infoBox);

            // --- State ---
            let lastEl = null;
            let firstSimilarEl = null; // For Shift mode step 1
            let mouseX = 0;
            let mouseY = 0;

            // --- Helpers ---
            function getPathSegments(el) {
                const path = [];
                while (el && el.nodeType === Node.ELEMENT_NODE) {
                    let tagName = el.nodeName.toLowerCase();
                    let index = 1;
                    let hasId = false;
                    let id = el.id;

                    if (id) {
                        hasId = true;
                    }

                    let sib = el;
                    while (sib = sib.previousElementSibling) {
                        if (sib.nodeName.toLowerCase() === tagName) index++;
                    }

                    path.unshift({ tagName, id, hasId, index, el });
                    el = el.parentNode;
                }
                return path;
            }

            function getCssSelector(el) {
                 if (!(el instanceof Element)) return '';
                 const path = [];
                 while (el.nodeType === Node.ELEMENT_NODE) {
                    let selector = el.nodeName.toLowerCase();
                    if (el.id) {
                        selector += '#' + el.id;
                        path.unshift(selector);
                        break;
                    } else {
                        let sib = el, nth = 1;
                        while (sib = sib.previousElementSibling) {
                            if (sib.nodeName.toLowerCase() == selector) nth++;
                        }
                        if (nth != 1) selector += ":nth-of-type("+nth+")";
                    }
                    path.unshift(selector);
                    el = el.parentNode;
                 }
                 return path.join(" > ");
            }

            function getSimilarSelector(el1, el2) {
                const path1 = getPathSegments(el1);
                const path2 = getPathSegments(el2);

                const len = Math.min(path1.length, path2.length);
                const commonPath = [];

                for (let i = 0; i < len; i++) {
                    const s1 = path1[i];
                    const s2 = path2[i];

                    if (s1.tagName !== s2.tagName) {
                        break;
                    }

                    let segment = s1.tagName;

                    if (s1.hasId && s2.hasId && s1.id === s2.id) {
                        segment += '#' + s1.id;
                    }

                    if (s1.el === s2.el) {
                        if (s1.hasId) {
                             // already handled
                        } else {
                             if (s1.index !== 1) segment += ":nth-of-type(" + s1.index + ")";
                        }
                    } else {
                        const cls1 = Array.from(s1.el.classList);
                        const cls2 = Array.from(s2.el.classList);
                        const commonClasses = cls1.filter(c => cls2.includes(c) && !c.startsWith('fat-notes-'));
                        if (commonClasses.length > 0) {
                            segment += '.' + commonClasses.join('.');
                        }
                    }

                    commonPath.push(segment);
                }

                return commonPath.join(" > ");
            }

            function updateStatus(text) {
                 const el = document.getElementById('fat-selector-status');
                 if (el) el.innerHTML = text;
            }

            function finish(selector) {
                if (lastEl) lastEl.classList.remove('fat-notes-selector-highlight');
                updateStatus("Selected: " + selector);
                const box = document.getElementById('fat-notes-selector-info');
                if (box) box.classList.add('success');
                window.on_element_selected(selector);
            }

            // --- Core Logic ---

            function handleState(e, isClick) {
                const isCtrl = e.ctrlKey || e.metaKey;
                const isShift = e.shiftKey;

                // 1. Update UI Status
                if (isCtrl) {
                     updateStatus('Mode: <b>Single Element</b> (Click to select)');
                } else if (isShift) {
                     if (firstSimilarEl) {
                         updateStatus('Mode: <b>Similar Elements</b> (Click second element)');
                     } else {
                         updateStatus('Mode: <b>Similar Elements</b> (Click first element)');
                     }
                } else {
                     updateStatus('Hold <span class="fat-key">Ctrl</span> to select single<br>Hold <span class="fat-key">Shift</span> to select similar');
                }

                // 2. Determine Target Element
                let target = null;
                if (e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'click') {
                    target = e.target;
                } else {
                    // Key events - find element under cursor
                    // Temporarily hide overlay to look behind it
                    const overlay = document.getElementById('fat-notes-selector-info');
                    if (overlay) overlay.style.display = 'none';
                    target = document.elementFromPoint(mouseX, mouseY);
                    if (overlay) overlay.style.display = 'block';
                }

                // Ignore our own UI
                if (target && (target.id === 'fat-notes-selector-info' || target.closest('#fat-notes-selector-info'))) {
                    return;
                }

                // 3. Highlight Logic
                // If no keys held and no active similar selection process, clear highlight
                if (!isCtrl && !isShift && !firstSimilarEl) {
                    if (lastEl) {
                        lastEl.classList.remove('fat-notes-selector-highlight');
                        lastEl = null;
                    }
                    // If clicking without keys, do nothing (let default happen)
                    return;
                }

                // If we have a valid target, highlight it
                if (target && target !== lastEl) {
                    if (lastEl) lastEl.classList.remove('fat-notes-selector-highlight');
                    target.classList.add('fat-notes-selector-highlight');
                    lastEl = target;
                }

                // 4. Click Handling
                if (isClick && target) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (isCtrl) {
                        const selector = getCssSelector(target);
                        finish(selector);
                    } else if (isShift) {
                        if (!firstSimilarEl) {
                            firstSimilarEl = target;
                            firstSimilarEl.classList.add('fat-notes-selector-selected-1');
                            updateStatus('First element selected. <br>Now <b>Shift + Click</b> the second similar element.');
                        } else {
                            if (firstSimilarEl === target) return; // Ignore clicking same element
                            
                            const selector = getSimilarSelector(firstSimilarEl, target);
                            firstSimilarEl.classList.remove('fat-notes-selector-selected-1');
                            firstSimilarEl = null;
                            
                            finish(selector);
                        }
                    }
                }
            }

            // --- Listeners ---

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                handleState(e, false);
            }, true);

            document.addEventListener('click', (e) => handleState(e, true), true);
            
            document.addEventListener('keydown', (e) => handleState(e, false), true);
            document.addEventListener('keyup', (e) => handleState(e, false), true);
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    })();
    """


def run_selector_tool(url: str = "") -> Optional[str]:
    global _playwright, _browser

    async def _do() -> Optional[str]:
        global _playwright, _browser
        nonlocal url
        from playwright.async_api import async_playwright

        _selector_event.clear()
        _selector_result["selector"] = None

        if _playwright is None:
            _playwright = await async_playwright().start()

        if _browser is None or not _browser.is_connected():
            launch_kwargs: Dict[str, Any] = {"headless": False, "args": ["--start-maximized"]}
            tried: List[Dict[str, Any]] = [
                {**launch_kwargs, "channel": "chrome"},
                {**launch_kwargs, "channel": "msedge"},
                launch_kwargs,
            ]
            last_err: Optional[Exception] = None
            for opts in tried:
                try:
                    _browser = await _playwright.chromium.launch(**opts)
                    last_err = None
                    break
                except Exception as e:
                    last_err = e
            if _browser is None and last_err is not None:
                raise last_err

        page = None
        context = None

        try:
            if getattr(_browser, "contexts", None):
                contexts = list(getattr(_browser, "contexts", []) or [])
                context = contexts[0] if contexts else None
                if context is not None and getattr(context, "pages", None):
                    pages = list(getattr(context, "pages", []) or [])
                    page = pages[-1] if pages else None
        except Exception:
            context = None
            page = None

        if not context:
            context = await _browser.new_context(viewport={"width": 1280, "height": 720})

        if not page:
            page = await context.new_page()

        try:
            await page.expose_function("on_element_selected", _selector_on_selected)
        except Exception:
            pass

        target_url = (url or "").strip()
        if target_url:
            try:
                await page.goto(target_url)
            except Exception:
                pass

        js = _get_selector_js_injection()
        try:
            await page.add_init_script(js)
            await page.evaluate(js)
        except Exception:
            pass

        while not _selector_event.is_set():
            try:
                if page.is_closed():
                    break
                if not _browser.is_connected():
                    break
            except Exception:
                break
            try:
                await page.wait_for_timeout(100)
            except Exception:
                await asyncio.sleep(0.1)

        v = _selector_result.get("selector")
        return v if isinstance(v, str) and v else None

    return _run(_do())


def _norm_str(v: Any) -> str:
    return "" if v is None else str(v).strip()


def _parse_browser_spec(open_type: str, custom_open_type: str) -> Dict[str, Any]:
    if _norm_str(open_type).lower() != "custom":
        return {"browser_type": "chromium", "channel": "", "headless": False}

    c = _norm_str(custom_open_type).lower()
    headless = "headless" in c

    if any(k in c for k in ("edge", "msedge")):
        return {"browser_type": "chromium", "channel": "msedge", "headless": headless}
    if any(k in c for k in ("chrome", "chromium")):
        return {"browser_type": "chromium", "channel": "chrome", "headless": headless}
    if any(k in c for k in ("firefox", "ff")):
        return {"browser_type": "firefox", "channel": "", "headless": headless}
    if any(k in c for k in ("webkit", "safari")):
        return {"browser_type": "webkit", "channel": "", "headless": headless}
    if headless:
        return {"browser_type": "chromium", "channel": "", "headless": True}
    return {"browser_type": "chromium", "channel": "", "headless": False}


async def _ensure_session_async(session_id: str, open_type: str, custom_open_type: str) -> Dict[str, Any]:
    sid = _norm_str(session_id)
    if not sid:
        raise ValueError("session_id is required")

    sess = _sessions.get(sid)
    if sess is not None:
        page = sess.get("page")
        try:
            if page is not None and not page.is_closed():
                return sess
        except Exception:
            pass

    spec = _parse_browser_spec(open_type, custom_open_type)
    from playwright.async_api import async_playwright

    p = await async_playwright().start()

    browser_type_name = str(spec.get("browser_type") or "chromium")
    channel = str(spec.get("channel") or "")
    headless = bool(spec.get("headless"))

    browser_app = p.chromium
    if browser_type_name == "firefox":
        browser_app = p.firefox
    elif browser_type_name == "webkit":
        browser_app = p.webkit

    launch_candidates: List[Dict[str, Any]] = []
    if browser_type_name == "chromium" and not channel:
        launch_candidates.append({"headless": headless, "channel": "msedge"})
        launch_candidates.append({"headless": headless, "channel": "chrome"})
    if browser_type_name == "chromium" and channel:
        launch_candidates.append({"headless": headless, "channel": channel})
        alt = "chrome" if channel == "msedge" else "msedge" if channel == "chrome" else ""
        if alt:
            launch_candidates.append({"headless": headless, "channel": alt})
        launch_candidates.append({"headless": headless})
    else:
        base_opts: Dict[str, Any] = {"headless": headless}
        if channel:
            base_opts["channel"] = channel
        launch_candidates.append(base_opts)

    last_err: Optional[Exception] = None
    browser = None
    for opts in launch_candidates:
        try:
            browser = await browser_app.launch(**opts)
            last_err = None
            break
        except Exception as e:
            last_err = e

    if browser is None:
        try:
            await p.stop()
        except Exception:
            pass
        if last_err is not None:
            raise last_err
        raise RuntimeError("failed to launch browser")

    context = await browser.new_context()
    page = await context.new_page()

    sess = {"playwright": p, "browser": browser, "context": context, "page": page}
    _sessions[sid] = sess
    return sess


def ensure_page(session_id: str, open_type: str = "default", custom_open_type: str = "") -> Dict[str, Any]:
    _run(_ensure_session_async(session_id, open_type, custom_open_type))
    return {"ok": True}


def _get_page(session_id: str) -> Any:
    sid = _norm_str(session_id)
    sess = _sessions.get(sid)
    if sess is None:
        raise RuntimeError("browser session not initialized")
    page = sess.get("page")
    if page is None:
        raise RuntimeError("browser page not initialized")
    try:
        if page.is_closed():
            raise RuntimeError("browser page is closed")
    except Exception:
        pass
    return page


def _get_locator(page: Any, selector: str) -> Any:
    s = _norm_str(selector)
    if not s:
        raise ValueError("selector is required")
    sl = s.lower()
    if sl.startswith("xpath:"):
        return page.locator(f"xpath={s[len('xpath:'):].strip()}")
    if sl.startswith("xpath="):
        return page.locator(s)
    if sl.startswith("css:"):
        return page.locator(f"css={s[len('css:'):].strip()}")
    if sl.startswith("css="):
        return page.locator(s)
    if s.startswith("//") or s.startswith("(//"):
        return page.locator(f"xpath={s}")
    return page.locator(s)


def goto(
    session_id: str,
    url: str,
    wait_type: str = "loadComplete",
    nav_timeout_ms: int = 60000,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        u = _norm_str(url)
        if not u:
            raise ValueError("url is required")

        timeout = int(nav_timeout_ms) if nav_timeout_ms is not None else 60000
        wt = _norm_str(wait_type)

        if wt == "loadComplete":
            await page.goto(u, wait_until="domcontentloaded", timeout=timeout)
            try:
                await page.wait_for_load_state("load", timeout=timeout)
            except Exception:
                pass
        elif wt == "domComplete":
            await page.goto(u, wait_until="domcontentloaded", timeout=timeout)
        else:
            await page.goto(u, wait_until="commit", timeout=timeout)

        return {"ok": True}

    return _run(_do())


def page_info(session_id: str) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        page_url = ""
        page_title = ""
        try:
            page_url = _norm_str(getattr(page, "url", ""))
        except Exception:
            page_url = ""
        try:
            page_title = _norm_str(await page.title())
        except Exception:
            page_title = ""
        return {"url": page_url, "title": page_title}

    return _run(_do())


def click(
    session_id: str,
    selector: str,
    action: str = "click",
    modifiers: Optional[List[str]] = None,
    duration_ms: int = 0,
    click_count: int = 1,
    interval_ms: int = 0,
    force: bool = False,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        locator = _get_locator(page, selector)

        act = _norm_str(action).lower() or "click"
        mods = modifiers or []
        duration_ms_i = max(int(duration_ms or 0), 0)
        click_count_i = max(int(click_count or 1), 1)
        interval_ms_i = max(int(interval_ms or 0), 0)

        opts: Dict[str, Any] = {}
        if mods:
            opts["modifiers"] = mods
        if duration_ms_i > 0:
            opts["delay"] = duration_ms_i
        if force and act in ("click", "doubleclick"):
            opts["force"] = True

        if act == "release":
            await locator.dispatch_event("mouseup")
            return {"ok": True}
        if act == "press":
            await locator.dispatch_event("mousedown")
            if duration_ms_i > 0:
                await page.wait_for_timeout(duration_ms_i)
            return {"ok": True}
        if act == "doubleclick":
            await locator.dblclick(**opts)
            return {"ok": True}

        if interval_ms_i > 0 and click_count_i > 1:
            for i in range(click_count_i):
                await locator.click(**opts)
                if i < click_count_i - 1:
                    await page.wait_for_timeout(interval_ms_i)
            return {"ok": True}

        await locator.click(click_count=click_count_i, **opts)
        return {"ok": True}

    return _run(_do())


def input_text(
    session_id: str,
    selector: str,
    text: Any = "",
    modifiers: Optional[List[str]] = None,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        locator = _get_locator(page, selector)

        mods = modifiers or []
        v = "" if text is None else str(text)

        for k in mods:
            await page.keyboard.down(k)
        try:
            try:
                await locator.fill(v)
            except Exception:
                try:
                    await locator.click()
                except Exception:
                    pass
                try:
                    await page.keyboard.press("Control+A")
                    await page.keyboard.press("Backspace")
                except Exception:
                    pass
                await page.keyboard.type(v)
        finally:
            for k in reversed(mods):
                await page.keyboard.up(k)

        return {"ok": True}

    return _run(_do())


def hover(
    session_id: str,
    selector: str,
    modifiers: Optional[List[str]] = None,
    duration_ms: int = 0,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        locator = _get_locator(page, selector)

        mods = modifiers or []
        duration_ms_i = max(int(duration_ms or 0), 0)

        for k in mods:
            await page.keyboard.down(k)
        try:
            await locator.hover()
            if duration_ms_i > 0:
                await page.wait_for_timeout(duration_ms_i)
        finally:
            for k in reversed(mods):
                await page.keyboard.up(k)

        return {"ok": True}

    return _run(_do())


def check(
    session_id: str,
    selector: str,
    action: str = "check",
    modifiers: Optional[List[str]] = None,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        locator = _get_locator(page, selector)

        act = _norm_str(action).lower() or "check"
        mods = modifiers or []

        for k in mods:
            await page.keyboard.down(k)
        try:
            is_checked = await locator.is_checked()
            should_check = False
            should_uncheck = False

            if act == "check":
                if not is_checked:
                    should_check = True
            elif act == "uncheck":
                if is_checked:
                    should_uncheck = True
            elif act == "toggle":
                should_uncheck = bool(is_checked)
                should_check = not bool(is_checked)
            else:
                raise ValueError(f"Unsupported action: {act}")

            if should_check:
                try:
                    await locator.check()
                except Exception:
                    await locator.click()
            elif should_uncheck:
                try:
                    await locator.uncheck()
                except Exception:
                    await locator.click()
        finally:
            for k in reversed(mods):
                await page.keyboard.up(k)

        return {"ok": True}

    return _run(_do())


def drag_to(
    session_id: str,
    selector: str,
    target_selector: str,
    modifiers: Optional[List[str]] = None,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        src = _get_locator(page, selector)
        dst = _get_locator(page, target_selector)

        mods = modifiers or []
        for k in mods:
            await page.keyboard.down(k)
        try:
            await src.drag_to(dst)
        finally:
            for k in reversed(mods):
                await page.keyboard.up(k)

        return {"ok": True}

    return _run(_do())


def scroll(
    session_id: str,
    selector: str,
    delta_x: int = 0,
    delta_y: int = 0,
    duration_ms: int = 0,
    modifiers: Optional[List[str]] = None,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        locator = _get_locator(page, selector)
        await locator.hover()

        mods = modifiers or []
        for k in mods:
            await page.keyboard.down(k)
        try:
            duration_ms_i = max(int(duration_ms or 0), 0)
            if duration_ms_i <= 0:
                await page.mouse.wheel(delta_x, delta_y)
                return {"ok": True}

            step_every_ms = 50
            steps = max(1, int(round(duration_ms_i / step_every_ms)))
            interval_ms = int(round(duration_ms_i / steps))

            step_x = delta_x / steps
            step_y = delta_y / steps
            for i in range(steps):
                await page.mouse.wheel(step_x, step_y)
                if i < steps - 1 and interval_ms > 0:
                    await page.wait_for_timeout(interval_ms)
        finally:
            for k in reversed(mods):
                await page.keyboard.up(k)

        return {"ok": True}

    return _run(_do())


def select(
    session_id: str,
    selector: str,
    select_type: str = "value",
    value: Any = "",
    modifiers: Optional[List[str]] = None,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        element = _get_locator(page, selector)

        st = _norm_str(select_type)
        mods = modifiers or []

        for k in mods:
            await page.keyboard.down(k)
        try:
            if st == "value":
                await element.select_option(value="" if value is None else str(value))
            elif st == "visibleText":
                await element.select_option(label="" if value is None else str(value))
            elif st == "index":
                if value is None:
                    raise ValueError("value is required")
                await element.select_option(index=int(value))
            else:
                raise ValueError(f"Unsupported selectType: {st}")
        finally:
            for k in reversed(mods):
                await page.keyboard.up(k)

        return {"ok": True}

    return _run(_do())


def get_element_data(session_id: str, selector: str, data_type: str = "text") -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        element = _get_locator(page, selector)

        dt = _norm_str(data_type).lower() or "text"
        if dt == "text":
            try:
                return {"data": await element.inner_text()}
            except Exception:
                return {"data": ""}
        if dt == "html":
            try:
                return {"data": await element.inner_html()}
            except Exception:
                return {"data": ""}
        if dt == "attributes":
            try:
                return {
                    "data": await element.evaluate(
                        """
                    element => {
                        const attrs = element.attributes;
                        const out = {};
                        for (let i = 0; i < attrs.length; i++) {
                            const a = attrs[i];
                            if (a && a.name) out[a.name] = a.value;
                        }
                        return out;
                    }
                """
                    )
                }
            except Exception:
                return {"data": {}}
        if dt == "url":
            for key in ("href", "src", "data-url", "url"):
                try:
                    val = await element.get_attribute(key)
                    if val:
                        return {"data": val}
                except Exception:
                    continue
            return {"data": ""}
        raise ValueError(f"Unsupported dataType: {dt}")

    return _run(_do())


def upload_file(session_id: str, selector: str, local_file: str) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)
        element = _get_locator(page, selector)
        await element.set_input_files(local_file)
        return {"ok": True}

    return _run(_do())


def _matches(rule_type: str, pattern: str, url: str, title: str) -> bool:
    if pattern == "*":
        return True
    p = pattern.lower()
    u = (url or "").lower()
    t = (title or "").lower()

    if rule_type == "url":
        return p in u
    if rule_type == "title":
        return p in t
    if rule_type == "url_exact":
        return p == u
    if rule_type == "title_exact":
        return p == t
    if rule_type == "any_exact":
        return p == u or p == t
    return (p in u) or (p in t)


def close_current(session_id: str) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        sid = _norm_str(session_id)
        sess = _sessions.get(sid)
        if sess is None:
            return {"remaining": 0}

        page = sess.get("page")
        ctx = sess.get("context")
        if page is not None:
            try:
                await page.close()
            except Exception:
                pass

        pages: List[Any] = []
        try:
            pages = list(getattr(ctx, "pages", []) or [])
            pages = [p for p in pages if not getattr(p, "is_closed", lambda: False)()]
        except Exception:
            pages = []

        if pages:
            sess["page"] = pages[0]
            return {"remaining": len(pages)}

        return await _close_all_async(session_id)

    return _run(_do())


def close_by_rule(session_id: str, rule_type: str, pattern: str) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        sid = _norm_str(session_id)
        sess = _sessions.get(sid)
        if sess is None:
            return {"remaining": 0}

        page = sess.get("page")
        if page is None:
            return await _close_all_async(session_id)

        ctx = page.context
        pages: List[Any] = list(getattr(ctx, "pages", []) or [])
        if not pages:
            sess["page"] = None
            return await _close_all_async(session_id)

        closed_any = False
        for p in list(pages):
            try:
                url = _norm_str(getattr(p, "url", ""))
                title = _norm_str(await p.title())
                if _matches(rule_type, pattern, url, title):
                    await p.close()
                    closed_any = True
            except Exception:
                continue

        if not closed_any:
            raise RuntimeError("No matching web page found to close")

        remaining_pages = list(getattr(ctx, "pages", []) or [])
        remaining_pages = [p for p in remaining_pages if not getattr(p, "is_closed", lambda: False)()]
        sess["page"] = remaining_pages[0] if remaining_pages else None

        if remaining_pages:
            return {"remaining": len(remaining_pages)}
        return await _close_all_async(session_id)

    return _run(_do())


def refresh(
    session_id: str,
    refresh_type: str = "default",
    custom_refresh_type: str = "",
    match_type: str = "",
    match_value: str = "",
    is_exact_match: bool = False,
) -> Dict[str, Any]:
    async def _do() -> Dict[str, Any]:
        page = _get_page(session_id)

        rt = _norm_str(refresh_type).lower() or "default"
        ct = _norm_str(custom_refresh_type).lower()
        mt = _norm_str(match_type).strip()
        mv = _norm_str(match_value)

        async def refresh_one(p: Any) -> None:
            if rt != "custom":
                await p.reload()
                return

            if ct == "hard":
                await p.evaluate("location.reload(true)")
                try:
                    await p.wait_for_load_state()
                except Exception:
                    pass
                return
            if ct == "url":
                u = _norm_str(getattr(p, "url", ""))
                if u:
                    await p.goto(u)
                else:
                    await p.reload()
                return
            if ct == "js":
                await p.evaluate("location.reload()")
                try:
                    await p.wait_for_load_state()
                except Exception:
                    pass
                return

            await p.reload()

        if not mt:
            await refresh_one(page)
            return {"ok": True}

        if mt == "all":
            pages = list(getattr(page.context, "pages", []) or [])
            if not pages:
                raise RuntimeError("No web page found to refresh")
            for p in pages:
                try:
                    await refresh_one(p)
                except Exception:
                    continue
            return {"ok": True}

        if mt not in ("urlMatch", "titleMatch", "autoMatch"):
            await refresh_one(page)
            return {"ok": True}

        if not mv:
            raise ValueError("matchValue is required")

        rule_type = "any"
        if mt == "urlMatch":
            rule_type = "url_exact" if bool(is_exact_match) else "url"
        elif mt == "titleMatch":
            rule_type = "title_exact" if bool(is_exact_match) else "title"
        elif mt == "autoMatch":
            rule_type = "any_exact" if bool(is_exact_match) else "any"

        pages = list(getattr(page.context, "pages", []) or [])
        if not pages:
            raise RuntimeError("No web page found to refresh")

        matched_any = False
        for p in pages:
            try:
                url = _norm_str(getattr(p, "url", ""))
                title = _norm_str(await p.title())
                if _matches(rule_type, mv, url, title):
                    matched_any = True
                    await refresh_one(p)
            except Exception:
                continue

        if not matched_any:
            raise RuntimeError("No matching web page found to refresh")

        return {"ok": True}

    return _run(_do())


async def _close_all_async(session_id: str) -> Dict[str, Any]:
    sid = _norm_str(session_id)
    sess = _sessions.pop(sid, None)
    if not sess:
        return {"remaining": 0}

    try:
        ctx = sess.get("context")
        if ctx is not None:
            try:
                for p in list(getattr(ctx, "pages", []) or []):
                    try:
                        await p.close()
                    except Exception:
                        pass
            finally:
                try:
                    browser = sess.get("browser")
                    if browser is not None:
                        await browser.close()
                finally:
                    pw = sess.get("playwright")
                    if pw is not None:
                        try:
                            await pw.stop()
                        except Exception:
                            pass
    except Exception:
        pass

    return {"remaining": 0}


def close_all(session_id: str) -> Dict[str, Any]:
    return _run(_close_all_async(session_id))
