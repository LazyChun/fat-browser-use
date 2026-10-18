import React, { useMemo } from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const CheckAction = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserCheckWebElementNode>();

  const actionOptions = useMemo(
    () => [
      {
        value: "check",
        label: i18n.text(
          "block.flow.node.config.scBrowserCheckWebElement.action.check",
        ),
      },
      {
        value: "uncheck",
        label: i18n.text(
          "block.flow.node.config.scBrowserCheckWebElement.action.uncheck",
        ),
      },
    ],
    [i18n.locale],
  );

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserCheckWebElement.action.title",
      )}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.action ?? "check"}
        onChange={(val) => onUpdateNode({ id: node.id, action: val })}
        options={actionOptions}
      />
    </FatForm.Item>
  );
};

export default CheckAction;

