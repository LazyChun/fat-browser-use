import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const CustomCloseType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserCloseWebPageNode>();

  if (node.closeType !== "custom") return null;

  const handleChange = (val: string) => {
    if (val === "all") {
      onUpdateNode({
        id: node.id,
        customCloseType: val,
        matchValue: undefined,
        isExactMatch: false,
      });
      return;
    }
    onUpdateNode({ id: node.id, customCloseType: val });
  };

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserCloseWebPage.customCloseType",
      )}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.customCloseType || "autoMatch"}
        onChange={handleChange}
        options={[
          {
            value: "urlMatch",
            label: i18n.text(
              "block.flow.node.config.scBrowserCloseWebPage.customCloseType.urlMatch",
            ),
          },
          {
            value: "titleMatch",
            label: i18n.text(
              "block.flow.node.config.scBrowserCloseWebPage.customCloseType.titleMatch",
            ),
          },
          {
            value: "autoMatch",
            label: i18n.text(
              "block.flow.node.config.scBrowserCloseWebPage.customCloseType.autoMatch",
            ),
          },
          {
            value: "all",
            label: i18n.text(
              "block.flow.node.config.scBrowserCloseWebPage.customCloseType.all",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default CustomCloseType;
