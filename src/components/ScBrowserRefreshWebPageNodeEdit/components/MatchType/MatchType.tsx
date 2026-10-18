import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const MatchType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserRefreshWebPageNode>();

  const handleChange = (val: string) => {
    if (!val) {
      onUpdateNode({
        id: node.id,
        matchType: undefined,
        matchValue: undefined,
        isExactMatch: false,
      });
      return;
    }

    if (val === "all") {
      onUpdateNode({
        id: node.id,
        matchType: val,
        matchValue: undefined,
        isExactMatch: false,
      });
      return;
    }

    onUpdateNode({ id: node.id, matchType: val });
  };

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserRefreshWebPage.matchType")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.matchType || ""}
        onChange={handleChange}
        options={[
          {
            value: "",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.matchType.current",
            ),
          },
          {
            value: "urlMatch",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.matchType.urlMatch",
            ),
          },
          {
            value: "titleMatch",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.matchType.titleMatch",
            ),
          },
          {
            value: "autoMatch",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.matchType.autoMatch",
            ),
          },
          {
            value: "all",
            label: i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.matchType.all",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default MatchType;
