import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const ClickAction = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } = useFlowNode<LogicFlow.ScBrowserClickWebElementNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserClickWebElement.action")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.action || "click"}
        onChange={(val) => onUpdateNode({ id: node.id, action: val })}
        options={[
          {
            value: "click",
            label: i18n.text(
              "block.flow.node.config.scBrowserClickWebElement.action.click",
            ),
          },
          {
            value: "doubleClick",
            label: i18n.text(
              "block.flow.node.config.scBrowserClickWebElement.action.doubleClick",
            ),
          },
          {
            value: "press",
            label: i18n.text(
              "block.flow.node.config.scBrowserClickWebElement.action.press",
            ),
          },
          {
            value: "release",
            label: i18n.text(
              "block.flow.node.config.scBrowserClickWebElement.action.release",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default ClickAction;

