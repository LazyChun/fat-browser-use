import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const HoverAction = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserHoverWebElementNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserHoverWebElement.action")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.action || "hover"}
        onChange={(val) => onUpdateNode({ id: node.id, action: val })}
        options={[
          {
            value: "hover",
            label: i18n.text(
              "block.flow.node.config.scBrowserHoverWebElement.action.hover",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default HoverAction;
