import React, { useMemo } from "react";
import { FatForm, VarInput } from "../../../../flowsdk";
import { useFlowNode, useI18n } from "../../../../flowsdk";

const UploadPathInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserUploadFileNode>();

  const vars = useMemo(() => {
    return node.inParams.map((p) => ({
      id: p.id,
      name: p.name,
    }));
  }, [node.inParams]);

  const uploadType =
    (node.uploadType || "trigger") === "url" ? "url" : "trigger";

  return (
    <FatForm.Item
      label={i18n.text(
        uploadType === "url"
          ? "block.flow.node.config.scBrowserUploadFile.uploadPath.url"
          : "block.flow.node.config.scBrowserUploadFile.uploadPath.trigger",
      )}
    >
      <VarInput
        value={node.uploadPath || ""}
        placeholder={i18n.text(
          uploadType === "url"
            ? "block.flow.node.config.scBrowserUploadFile.uploadPath.url.placeholder"
            : "block.flow.node.config.scBrowserUploadFile.uploadPath.trigger.placeholder",
        )}
        onChange={(value) => onUpdateNode({ id: node.id, uploadPath: value })}
        vars={vars}
      />
    </FatForm.Item>
  );
};

export default UploadPathInput;
