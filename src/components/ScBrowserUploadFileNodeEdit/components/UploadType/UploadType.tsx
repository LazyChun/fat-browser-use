import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const UploadType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } = useFlowNode<LogicFlow.ScBrowserUploadFileNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserUploadFile.uploadType")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={node.uploadType || "trigger"}
        onChange={(val) => onUpdateNode({ id: node.id, uploadType: val })}
        options={[
          {
            value: "trigger",
            label: i18n.text(
              "block.flow.node.config.scBrowserUploadFile.uploadType.trigger",
            ),
          },
          {
            value: "url",
            label: i18n.text(
              "block.flow.node.config.scBrowserUploadFile.uploadType.url",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default UploadType;

