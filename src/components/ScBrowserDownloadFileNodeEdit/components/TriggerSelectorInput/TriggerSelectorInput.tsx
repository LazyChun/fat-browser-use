import React from "react";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { EasyVarInput, FatForm } from "../../../../flowsdk";
import { WebElementSelectorPicker } from "../../../../flowsdk";

const TriggerSelectorInput = () => {
  const i18n = useI18n();
  const { node, onUpdateNode, vars } =
    useFlowNode<LogicFlow.ScBrowserDownloadFileNode>();

  if ((node.downloadType || "trigger") !== "trigger") return null;

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserDownloadFile.triggerSelector",
      )}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <EasyVarInput
          vars={vars}
          size="small"
          value={node.triggerSelector || ""}
          onChange={(e) =>
            onUpdateNode({ id: node.id, triggerSelector: e.target.value })
          }
          placeholder={i18n.text(
            "block.flow.node.config.scBrowserDownloadFile.triggerSelector.placeholder",
          )}
        />
        <WebElementSelectorPicker
          onSelect={(selector) =>
            onUpdateNode({ id: node.id, triggerSelector: selector })
          }
        />
      </div>
    </FatForm.Item>
  );
};

export default TriggerSelectorInput;

