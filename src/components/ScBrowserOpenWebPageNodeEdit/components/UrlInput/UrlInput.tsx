import React, { useMemo } from "react";
import { FatForm, VarInput } from "../../../../flowsdk";
import { useFlowNode, useI18n } from "../../../../flowsdk";

const UrlInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode, preNodes } =
    useFlowNode<LogicFlow.ScBrowserOpenWebPageNode>();

  const vars = useMemo(() => {
    return node.inParams.map((p) => ({
      id: p.id,
      name: p.name,
    }));
  }, [node.inParams]);

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserOpenWebPage.url")}
    >
      <VarInput
        value={node.url || ""}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserOpenWebPage.url.placeholder",
        )}
        onChange={(value) => onUpdateNode({ id: node.id, url: value })}
        vars={vars}
      />
    </FatForm.Item>
  );
};

export default UrlInput;
