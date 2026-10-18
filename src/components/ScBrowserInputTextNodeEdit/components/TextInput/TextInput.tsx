import React from "react";
import { EasyVarInput, FatForm } from "../../../../flowsdk";
import { useFlowNode, useI18n } from "../../../../flowsdk";

const TextInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode, vars } =
    useFlowNode<LogicFlow.ScBrowserInputTextNode>();

  return (
    <FatForm.Item label={i18n.text("block.flow.node.config.scBrowserInputText.text")}>
      <EasyVarInput
        vars={vars}
        size="small"
        value={node.text || ""}
        onChange={(e) => onUpdateNode({ id: node.id, text: e.target.value })}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserInputText.text.placeholder",
        )}
      />
    </FatForm.Item>
  );
};

export default TextInput;
