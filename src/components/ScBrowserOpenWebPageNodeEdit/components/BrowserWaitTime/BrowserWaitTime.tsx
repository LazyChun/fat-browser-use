import React from "react";
import { InputNumber } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const BrowserWaitTime = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserOpenWebPageNode>();

  if (node.waitType !== "custom") return null;

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserOpenWebPage.waitTime")}
    >
      <InputNumber
        size="small"
        style={{ width: "100%" }}
        value={node.waitTime}
        min={0}
        onChange={(val) => onUpdateNode({ id: node.id, waitTime: val })}
      />
    </FatForm.Item>
  );
};

export default BrowserWaitTime;
