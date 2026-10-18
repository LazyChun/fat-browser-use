import React, { useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { requests } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const Browser = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserRefreshWebPageNode>();
  const [browsers, setBrowsers] = useState<string[]>([]);

  useEffect(() => {
    requests.get<string[]>("app/flow/installedBrowsers").then((res) => {
      if (res.isOk) {
        setBrowsers(res.data || []);
      }
    });
    if (!node.browser) {
      onUpdateNode({ id: node.id, browser: "default" });
    }
  }, []);

  const options = useMemo(() => {
    const list = [
      {
        value: "default",
        label: i18n.text(
          "block.flow.node.config.scBrowserRefreshWebPage.browser.default",
        ),
      },
      {
        value: "all",
        label: i18n.text(
          "block.flow.node.config.scBrowserRefreshWebPage.browser.all",
        ),
      },
      ...browsers.map((b) => ({ value: b, label: b })),
    ];
    const used = new Set<string>();
    return list.filter((o) => {
      if (used.has(o.value)) return false;
      used.add(o.value);
      return true;
    });
  }, [browsers, i18n.locale]);

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserRefreshWebPage.browser")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.browser || "default"}
        onChange={(val) => onUpdateNode({ id: node.id, browser: val })}
        options={options}
      />
    </FatForm.Item>
  );
};

export default Browser;
