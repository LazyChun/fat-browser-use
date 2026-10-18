import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { requests } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const CustomOpenOptions = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserOpenWebPageNode>();
  const [browsers, setBrowsers] = useState<string[]>([]);

  useEffect(() => {
    requests.get<string[]>("app/flow/installedBrowsers").then((res) => {
      if (res.isOk) {
        const list = res.data || [];
        setBrowsers(list);
        if (!node.customBrowser && list.length > 0) {
          onUpdateNode({ id: node.id, customBrowser: list[0] });
        }
      }
    });
  }, []);

  if (node.openType !== "custom") return null;

  return (
    <>
      <FatForm.Item
        label={i18n.text(
          "block.flow.node.config.scBrowserOpenWebPage.customBrowser",
        )}
      >
        <Select
          size="small"
          style={{ width: "100%" }}
          value={node.customBrowser}
          onChange={(val) => onUpdateNode({ id: node.id, customBrowser: val })}
          options={browsers.map((b) => ({ value: b, label: b }))}
        />
      </FatForm.Item>
      <FatForm.Item
        label={i18n.text(
          "block.flow.node.config.scBrowserOpenWebPage.customOpenType",
        )}
      >
        <Select
          size="small"
          style={{ width: "100%" }}
          value={node.customOpenType || "normal"}
          onChange={(val) => onUpdateNode({ id: node.id, customOpenType: val })}
          options={[
            {
              value: "normal",
              label: i18n.text(
                "block.flow.node.config.scBrowserOpenWebPage.customOpenType.normal",
              ),
            },
            {
              value: "headless",
              label: i18n.text(
                "block.flow.node.config.scBrowserOpenWebPage.customOpenType.headless",
              ),
            },
          ]}
        />
      </FatForm.Item>
    </>
  );
};

export default CustomOpenOptions;
