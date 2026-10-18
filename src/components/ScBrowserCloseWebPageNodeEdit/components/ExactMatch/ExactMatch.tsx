import React from "react";
import { Switch } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const ExactMatch = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserCloseWebPageNode>();

  if (node.closeType !== "custom") return null;
  if (!node.customCloseType) return null;
  if (node.customCloseType === "all") return null;

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserCloseWebPage.isExactMatch",
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
