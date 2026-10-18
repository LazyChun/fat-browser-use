import React from "react";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { EasyVarInput, FatForm } from "../../../../flowsdk";
import { WebElementSelectorPicker } from "../../../../flowsdk";

const SourceSelectorInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode, vars } =
    useFlowNode<LogicFlow.ScBrowserDragWebElementNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserDragWebElement.selector")}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <EasyVarInput
          vars={vars}
          size="small"
          value={node.selector || ""}
          onChange={(e) =>
            onUpdateNode({ id: node.id, selector: e.target.value })
          }
          placeholder={i18n.text(
            "block.flow.node.config.scBrowserDragWebElement.selector.placeholder",
          )}
        />
        <WebElementSelectorPicker
          onSelect={(selector) => onUpdateNode({ id: node.id, selector })}
        />
      </div>
    </FatForm.Item>
  );
};

export default SourceSelectorInput;

