import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const CustomRefreshType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserRefreshWebPageNode>();

  if (node.refreshType !== "custom") return null;

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserRefreshWebPage.customRefreshType",
      )}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.customRefreshType || "hard"}
        onChange={(val) => onUpdateNode({ id: node.id, customRefreshType: val })}
        options={[
          {
            value: "hard",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.customRefreshType.hard",
            ),
          },
          {
            value: "url",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.customRefreshType.url",
            ),
          },
          {
            value: "js",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.customRefreshType.js",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default CustomRefreshType;
