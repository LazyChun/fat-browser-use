import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const RefreshType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserRefreshWebPageNode>();

  const handleChange = (val: string) => {
    if (val === "default") {
      onUpdateNode({
        id: node.id,
        refreshType: val,
        customRefreshType: undefined,
      });
      return;
    }
    onUpdateNode({ id: node.id, refreshType: val });
  };

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserRefreshWebPage.refreshType",
      )}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.refreshType || "default"}
        onChange={handleChange}
        options={[
          {
            value: "default",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.refreshType.default",
            ),
          },
          {
            value: "custom",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.refreshType.custom",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default RefreshType;
