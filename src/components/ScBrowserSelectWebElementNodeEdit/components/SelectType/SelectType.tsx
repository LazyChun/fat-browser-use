import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const SelectType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserSelectWebElementNode>();

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserSelectWebElement.selectType",
      )}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.selectType || "value"}
        onChange={(val) => onUpdateNode({ id: node.id, selectType: val })}
        options={[
          {
            value: "value",
            label: i18n.text(
              "block.flow.node.config.scBrowserSelectWebElement.selectType.value",
            ),
          },
          {
            value: "visibleText",
            label: i18n.text(
              "block.flow.node.config.scBrowserSelectWebElement.selectType.visibleText",
            ),
          },
          {
            value: "index",
            label: i18n.text(
              "block.flow.node.config.scBrowserSelectWebElement.selectType.index",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default SelectType;

