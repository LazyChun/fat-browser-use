import React, { useMemo } from "react";
import { FatForm, VarInput } from "../../../../flowsdk";
import { useFlowNode, useI18n } from "../../../../flowsdk";

const FileUrlInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } = useFlowNode<LogicFlow.ScBrowserUploadFileNode>();

  const vars = useMemo(() => {
    return node.inParams.map((p) => ({
      id: p.id,
      name: p.name,
    }));
  }, [node.inParams]);

  if ((node.uploadType || "trigger") !== "url") return null;

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserUploadFile.fileUrl")}
    >
      <VarInput
        value={node.fileUrl || ""}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserUploadFile.fileUrl.placeholder",
        )}
        onChange={(value) => onUpdateNode({ id: node.id, fileUrl: value })}
        vars={vars}
      />
    </FatForm.Item>
  );
};

export default FileUrlInput;

