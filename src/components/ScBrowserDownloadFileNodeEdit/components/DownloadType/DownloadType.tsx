import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const DownloadType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserDownloadFileNode>();

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserDownloadFile.downloadType",
      )}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.downloadType || "trigger"}
        onChange={(val) => onUpdateNode({ id: node.id, downloadType: val })}
        options={[
          {
            value: "trigger",
            label: i18n.text(
              "block.flow.node.config.scBrowserDownloadFile.downloadType.trigger",
            ),
          },
          {
            value: "url",
            label: i18n.text(
              "block.flow.node.config.scBrowserDownloadFile.downloadType.url",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default DownloadType;

