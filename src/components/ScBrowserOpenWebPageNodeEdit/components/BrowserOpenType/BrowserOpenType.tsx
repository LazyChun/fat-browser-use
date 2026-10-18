import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const BrowserOpenType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserOpenWebPageNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserOpenWebPage.openType")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.openType || "default"}
        onChange={(val) => onUpdateNode({ id: node.id, openType: val })}
        options={[
          {
            value: "default",
            label: i18n.text(
              "block.flow.node.config.scBrowserOpenWebPage.openType.default",
            ),
          },
          {
            value: "custom",
            label: i18n.text(
              "block.flow.node.config.scBrowserOpenWebPage.openType.custom",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default BrowserOpenType;
