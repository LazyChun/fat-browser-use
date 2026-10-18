import React from "react";
import { InputNumber } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const ClickCount = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } = useFlowNode<LogicFlow.ScBrowserClickWebElementNode>();

  if (node.action !== "click" && node.action !== "doubleClick") {
    return null;
  }

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserClickWebElement.clickCount")}
    >
      <InputNumber
        size="small"
        min={1}
        style={{ width: "100%" }}
        value={node.clickCount ?? 1}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserClickWebElement.clickCount.placeholder",
        )}
        onChange={(val) =>
          onUpdateNode({ id: node.id, clickCount: val ?? 1 })
        }
      />
    </FatForm.Item>
  );
};

export default ClickCount;

