import React from "react";
import { InputNumber } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const Duration = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } = useFlowNode<LogicFlow.ScBrowserClickWebElementNode>();

  if (node.action !== "press") {
    return null;
  }

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserClickWebElement.duration")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <InputNumber
          size="small"
          min={0}
          style={{ width: 160 }}
          value={node.duration ?? 0}
          onChange={(val) => onUpdateNode({ id: node.id, duration: val ?? 0 })}
        />
        <span style={{ fontSize: 12, color: "rgba(0, 0, 0, 0.65)" }}>ms</span>
      </div>
    </FatForm.Item>
  );
};

export default Duration;

