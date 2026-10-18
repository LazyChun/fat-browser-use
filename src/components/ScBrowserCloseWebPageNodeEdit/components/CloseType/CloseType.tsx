import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const CloseType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserCloseWebPageNode>();

  const handleChange = (val: string) => {
    if (val === "all") {
      onUpdateNode({
        id: node.id,
        closeType: val,
        customCloseType: undefined,
        matchValue: undefined,
        isExactMatch: false,
      });
      return;
    }
    onUpdateNode({ id: node.id, closeType: val });
  };

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserCloseWebPage.closeType")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.closeType || "all"}
        onChange={handleChange}
        options={[
          {
            value: "all",
            label: i18n.text(
              "block.flow.node.config.scBrowserCloseWebPage.closeType.all",
            ),
          },
          {
            value: "custom",
            label: i18n.text(
              "block.flow.node.config.scBrowserCloseWebPage.closeType.custom",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default CloseType;
