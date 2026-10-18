import React, { useMemo } from "react";
import { Select } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const Direction = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserScrollWebElementNode>();

  const options = useMemo(() => {
    const orientation = node.orientation || "vertical";
    if (orientation === "horizontal") {
      return [
        {
          value: "left",
          label: i18n.text(
            "block.flow.node.config.scBrowserScrollWebElement.direction.left",
          ),
        },
        {
          value: "right",
          label: i18n.text(
            "block.flow.node.config.scBrowserScrollWebElement.direction.right",
          ),
        },
      ];
    }
    return [
      {
        value: "up",
        label: i18n.text(
          "block.flow.node.config.scBrowserScrollWebElement.direction.up",
        ),
      },
      {
        value: "down",
        label: i18n.text(
          "block.flow.node.config.scBrowserScrollWebElement.direction.down",
        ),
      },
    ];
  }, [i18n.locale, node.orientation]);

  const value = useMemo(() => {
    const orientation = node.orientation || "vertical";
    const dir = node.direction || (orientation === "horizontal" ? "right" : "down");
    if (orientation === "horizontal") {
      return dir === "left" || dir === "right" ? dir : "right";
    }
    return dir === "up" || dir === "down" ? dir : "down";
  }, [node.direction, node.orientation]);

  return (
    <FatForm.Item
      label={i18n.text("block.flow.node.config.scBrowserScrollWebElement.direction")}
    >
      <Select
        size="small"
        style={{ width: "100%" }}
        value={value}
        onChange={(val) => onUpdateNode({ id: node.id, direction: val })}
        options={options}
      />
    </FatForm.Item>
  );
};

export default Direction;
