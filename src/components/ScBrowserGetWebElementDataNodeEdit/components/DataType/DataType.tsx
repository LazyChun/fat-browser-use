import React, { useEffect, useMemo } from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";
import { basic } from "../../../../flowsdk";

const DataType = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserGetWebElementDataNode>();

  const options = useMemo(
    () => [
      {
        value: "text",
        label: i18n.text("block.flow.node.config.scBrowserGetWebElementData.dataType.text"),
      },
      {
        value: "html",
        label: i18n.text("block.flow.node.config.scBrowserGetWebElementData.dataType.html"),
      },
      {
        value: "attributes",
        label: i18n.text(
          "block.flow.node.config.scBrowserGetWebElementData.dataType.attributes",
        ),
      },
      {
        value: "url",
        label: i18n.text("block.flow.node.config.scBrowserGetWebElementData.dataType.url"),
      },
    ],
    [i18n.locale],
  );

  const value = node.dataType || "text";

  useEffect(() => {
    const desiredOutDataType = value === "attributes" ? "object" : "string";
    const existing = (node.outParams || [])[0];

    if (!existing) {
      const outId = basic.uuid();
      onUpdateNode({
        ...node,
        outParams: [
          {
            id: outId,
            path: [outId],
            dataType: desiredOutDataType,
            name: "data",
          },
        ],
      });
      return;
    }

    const next = {
      ...existing,
      name: existing.name || "data",
      dataType: desiredOutDataType,
      path: existing.path || [existing.id],
    };

    const needsUpdate =
      existing.dataType !== desiredOutDataType ||
      !existing.name ||
      !existing.path ||
      existing.path.length === 0;

    if (needsUpdate) {
      onUpdateNode({ ...node, outParams: [next] });
    }
  }, [node, onUpdateNode, value]);

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserGetWebElementData.dataType")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={value}
        onChange={(val) => onUpdateNode({ id: node.id, dataType: val })}
        options={options}
      />
    </FatForm.Item>
  );
};

export default DataType;
