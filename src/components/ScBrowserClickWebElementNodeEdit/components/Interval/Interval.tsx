import React from "react";
import { InputNumber } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const Interval = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } = useFlowNode<LogicFlow.ScBrowserClickWebElementNode>();

  if (node.action !== "click") {
    return null;
  }

  if ((node.clickCount ?? 1) <= 1) {
    return null;
  }

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserClickWebElement.interval")}
    >
      <InputNumber
        size="small"
        min={0}
        style={{ width: "100%" }}
        value={node.interval ?? 0}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserClickWebElement.interval.placeholder",
        )}
        onChange={(val) => onUpdateNode({ id: node.id, interval: val ?? 0 })}
      />
    </FatForm.Item>
  );
};

export default Interval;

