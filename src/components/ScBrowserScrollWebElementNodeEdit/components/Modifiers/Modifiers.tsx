import React, { useMemo } from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const Modifiers = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserScrollWebElementNode>();

  const modifierOptions = useMemo(
    () => [
      {
        value: "Ctrl",
        label: i18n.text(
          "block.flow.node.config.scBrowserScrollWebElement.modifier.ctrl",
        ),
      },
      {
        value: "Shift",
        label: i18n.text(
          "block.flow.node.config.scBrowserScrollWebElement.modifier.shift",
        ),
      },
      {
        value: "Alt",
        label: i18n.text(
          "block.flow.node.config.scBrowserScrollWebElement.modifier.alt",
        ),
      },
      {
        value: "Meta",
        label: i18n.text(
          "block.flow.node.config.scBrowserScrollWebElement.modifier.meta",
        ),
      },
    ],
    [i18n.locale],
  );

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserScrollWebElement.modifiers.title",
      )}
    >
      <Select
        size="small"
        mode="multiple"
        style={{ width: "100%" }}
        value={node.modifiers ?? []}
        placeholder={i18n.text(
          "block.flow.node.config.scBrowserScrollWebElement.modifiers.placeholder",
        )}
        onChange={(val) => onUpdateNode({ id: node.id, modifiers: val })}
        options={modifierOptions}
      />
    </FatForm.Item>
  );
};

export default Modifiers;
