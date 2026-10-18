import React from "react";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { EasyVarInput, FatForm } from "../../../../flowsdk";

const ValueInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode, vars } =
    useFlowNode<LogicFlow.ScBrowserSelectWebElementNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserSelectWebElement.value")}
    >
      <EasyVarInput
        vars={vars}
        size="small"
        value={node.value || ""}
        onChange={(e) => onUpdateNode({ id: node.id, value: e.target.value })}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserSelectWebElement.value.placeholder",
        )}
      />
    </FatForm.Item>
  );
};

export default ValueInput;

