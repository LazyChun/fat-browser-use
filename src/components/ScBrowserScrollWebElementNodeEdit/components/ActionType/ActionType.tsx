import React from "react";
import { Radio } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const ActionType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserScrollWebElementNode>();

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserScrollWebElement.actionType",
      )}
    >
      <Radio.Group
        value={node.actionType || "mouseScroll"}
        onChange={(e) => onUpdateNode({ id: node.id, actionType: e.target.value })}
      >
        <Radio value="mouseScroll">
          {i18n.text(
            "block.flow.node.config.scBrowserScrollWebElement.actionType.mouseScroll",
          )}
        </Radio>
      </Radio.Group>
    </FatForm.Item>
  );
};

export default ActionType;
