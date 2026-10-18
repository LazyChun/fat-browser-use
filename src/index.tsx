import type { Disposable, FatNotesPluginSDK } from "fat-notes-sdk";
import { setSdk } from "./sdkStore";
import { initFlowSdk } from "./flowsdk";
import { flowNodeDefs } from "./flowNodes";

const disposables: Disposable[] = [];

export async function activate(sdk: FatNotesPluginSDK): Promise<void> {
  setSdk(sdk);
  initFlowSdk();
  for (const def of flowNodeDefs) {
    disposables.push(sdk.contributions.registerFlowNodeType(def));
  }
}

export function deactivate(): void {
  while (disposables.length) {
    try { disposables.pop()?.dispose(); }
    catch (e) { console.warn("[fat-browser-use] dispose error", e); }
  }
}
