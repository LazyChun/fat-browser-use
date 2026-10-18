import React from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const RequestType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } = useFlowNode<LogicFlow.ScBrowserUploadFileNode>();

  if ((node.uploadType || "trigger") !== "url") return null;

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserUploadFile.requestType",
      )}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={(node.requestType || "POST").toUpperCase()}
        onChange={(val) => onUpdateNode({ id: node.id, requestType: val })}
        options={[
          {
            value: "POST",
            label: i18n.text(
              "block.flow.node.config.scBrowserUploadFile.requestType.post",
            ),
          },
          {
            value: "PUT",
            label: i18n.text(
              "block.flow.node.config.scBrowserUploadFile.requestType.put",
            ),
          },
        ]}
      />
    </FatForm.Item>
  );
};

export default RequestType;

