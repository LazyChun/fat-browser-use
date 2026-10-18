import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const DragAction = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserDragWebElementNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserDragWebElement.action")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.action || "drag"}
        onChange={(val) => onUpdateNode({ id: node.id, action: val })}
        options={[
          {
            value: "drag",
            label: i18n.text(
              "block.flow.node.config.scBrowserDragWebElement.action.drag",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default DragAction;

