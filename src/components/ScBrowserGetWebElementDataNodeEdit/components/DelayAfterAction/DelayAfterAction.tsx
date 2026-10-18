import React from "react";
import { InputNumber } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const DelayAfterAction = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserGetWebElementDataNode>();

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserGetWebElementData.delayAfterAction.title",
      )}
    >
      <InputNumber
        size="small"
        min={0}
        style={{ width: "100%" }}
        value={node.delayAfterAction ?? 0}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserGetWebElementData.delayAfterAction.placeholder",
        )}
        onChange={(val) =>
          onUpdateNode({ id: node.id, delayAfterAction: val ?? 0 })
        }
      />
    </FatForm.Item>
  );
};

export default DelayAfterAction;
