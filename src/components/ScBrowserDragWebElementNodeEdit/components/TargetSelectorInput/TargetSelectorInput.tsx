import React from "react";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { EasyVarInput, FatForm } from "../../../../flowsdk";
import { WebElementSelectorPicker } from "../../../../flowsdk";

const TargetSelectorInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode, vars } =
    useFlowNode<LogicFlow.ScBrowserDragWebElementNode>();

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserDragWebElement.targetSelector",
      )}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <EasyVarInput
          vars={vars}
          size="small"
          value={node.targetSelector || ""}
          onChange={(e) =>
            onUpdateNode({ id: node.id, targetSelector: e.target.value })
          }
          placeholder={i18n.text(
            "block.flow.node.config.scBrowserDragWebElement.targetSelector.placeholder",
          )}
        />
        <WebElementSelectorPicker
          onSelect={(selector) =>
            onUpdateNode({ id: node.id, targetSelector: selector })
          }
        />
      </div>
    </FatForm.Item>
  );
};

export default TargetSelectorInput;

