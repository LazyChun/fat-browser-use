import React, { useMemo } from "react";
import { FatForm, VarInput } from "../../../../flowsdk";
import { useFlowNode, useI18n } from "../../../../flowsdk";

const DownloadPathInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserDownloadFileNode>();

  const vars = useMemo(() => {
    return node.inParams.map((p) => ({
      id: p.id,
      name: p.name,
    }));
  }, [node.inParams]);

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserDownloadFile.downloadPath",
      )}
    >
      <VarInput
        value={node.downloadPath || ""}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserDownloadFile.downloadPath.placeholder",
        )}
        onChange={(value) => onUpdateNode({ id: node.id, downloadPath: value })}
        vars={vars}
      />
    </FatForm.Item>
  );
};

export default DownloadPathInput;

