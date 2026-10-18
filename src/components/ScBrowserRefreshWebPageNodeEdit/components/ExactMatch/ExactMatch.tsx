import React from "react";
import { Switch } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const ExactMatch = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserRefreshWebPageNode>();

  if (
    node.matchType !== "urlMatch" &&
    node.matchType !== "titleMatch" &&
    node.matchType !== "autoMatch"
  ) {
    return null;
  }

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserRefreshWebPage.isExactMatch",
      )}
    >
      <Switch
        size="small"
        checked={!!node.isExactMatch}
        onChange={(val) => onUpdateNode({ id: node.id, isExactMatch: val })}
      />
    </FatForm.Item>
  );
};

export default ExactMatch;
