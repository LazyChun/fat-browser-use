import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const BrowserWaitType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserOpenWebPageNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserOpenWebPage.waitType")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.waitType || "loadComplete"}
        onChange={(val) => onUpdateNode({ id: node.id, waitType: val as any })}
        options={[
          {
            value: "loadComplete",
            label: i18n.text(
              "block.flow.node.config.scBrowserOpenWebPage.waitType.loadComplete",
            ),
          },
          {
            value: "domComplete",
            label: i18n.text(
              "block.flow.node.config.scBrowserOpenWebPage.waitType.domComplete",
            ),
          },
          {
            value: "custom",
            label: i18n.text(
              "block.flow.node.config.scBrowserOpenWebPage.waitType.custom",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default BrowserWaitType;
