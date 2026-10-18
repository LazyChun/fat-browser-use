import React from "react";
import { InputNumber } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const Duration = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserDragWebElementNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserDragWebElement.duration")}
    >
      <InputNumber
        size="small"
        min={0}
        style={{ width: "100%" }}
        value={node.duration ?? 0}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserDragWebElement.duration.placeholder",
        )}
        onChange={(val) => onUpdateNode({ id: node.id, duration: val ?? 0 })}
      />
    </FatForm.Item>
  );
};

export default Duration;

