import React, { useMemo } from "react";
import { FatForm, VarInput } from "../../../../flowsdk";
import { useFlowNode, useI18n } from "../../../../flowsdk";

const MatchValue = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserCloseWebPageNode>();

  const vars = useMemo(() => {
    return (node.inParams || []).map((p) => ({ id: p.id, name: p.name }));
  }, [node.inParams]);

  if (node.closeType !== "custom") return null;
  if (!node.customCloseType) return null;
  if (node.customCloseType === "all") return null;

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserCloseWebPage.matchValue")}
    >
      <VarInput
        value={node.matchValue || ""}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserCloseWebPage.matchValue.placeholder",
        )}
        onChange={(value) => onUpdateNode({ id: node.id, matchValue: value })}
        vars={vars}
      />
    </FatForm.Item>
  );
};

export default MatchValue;
