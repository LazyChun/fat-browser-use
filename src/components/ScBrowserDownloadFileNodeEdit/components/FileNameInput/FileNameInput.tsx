import React from "react";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { EasyVarInput, FatForm } from "../../../../flowsdk";

const FileNameInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode, vars } =
    useFlowNode<LogicFlow.ScBrowserDownloadFileNode>();

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserDownloadFile.fileName")}
    >
      <EasyVarInput
        vars={vars}
        size="small"
        value={node.fileName || ""}
        onChange={(e) =>
          onUpdateNode({ id: node.id, fileName: e.target.value })
        }
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserDownloadFile.fileName.placeholder",
        )}
      />
    </FatForm.Item>
  );
};

export default FileNameInput;

