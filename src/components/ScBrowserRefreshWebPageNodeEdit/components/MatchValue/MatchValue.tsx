import React, { useMemo } from "react";
import { FatForm, VarInput } from "../../../../flowsdk";
import { useFlowNode, useI18n } from "../../../../flowsdk";

const MatchValue = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserRefreshWebPageNode>();

  const vars = useMemo(() => {
    return (node.inParams || []).map((p) => ({ id: p.id, name: p.name }));
  }, [node.inParams]);

  if (
    node.matchType !== "urlMatch" &&
    node.matchType !== "titleMatch" &&
    node.matchType !== "autoMatch"
  ) {
    return null;
  }

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserRefreshWebPage.matchValue")}
    >
      <VarInput
        value={node.matchValue || ""}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserRefreshWebPage.matchValue.placeholder",
        )}
        onChange={(value) => onUpdateNode({ id: node.id, matchValue: value })}
        vars={vars}
      />
    </FatForm.Item>
  );
};

export default MatchValue;
