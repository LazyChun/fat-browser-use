import React from "react";
import { Radio } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FatForm } from "../../../../flowsdk";

const Orientation = () => {
  const i18n = useI18n();
  const { node, onUpdateNode } =
    useFlowNode<LogicFlow.ScBrowserScrollWebElementNode>();

  const handleChange = (nextOrientation: string) => {
    const currentDirection = node.direction || "down";
    let nextDirection = currentDirection;

    if (
      nextOrientation === "vertical" &&
      (currentDirection === "left" || currentDirection === "right")
    ) {
      nextDirection = "down";
    }

    if (
      nextOrientation === "horizontal" &&
      (currentDirection === "up" || currentDirection === "down")
    ) {
      nextDirection = "right";
    }

    onUpdateNode({
      id: node.id,
      orientation: nextOrientation,
      direction: nextDirection,
    });
  };

  return (
    <FatForm.Item
      label={i18n.text(
        "block.flow.node.config.scBrowserScrollWebElement.orientation",
      )}
    >
      <Radio.Group
        value={node.orientation || "vertical"}
        onChange={(e) => handleChange(e.target.value)}
      >
        <Radio value="vertical">
          {i18n.text(
            "block.flow.node.config.scBrowserScrollWebElement.orientation.vertical",
          )}
        </Radio>
        <Radio value="horizontal">
          {i18n.text(
            "block.flow.node.config.scBrowserScrollWebElement.orientation.horizontal",
          )}
        </Radio>
      </Radio.Group>
    </FatForm.Item>
  );
};

export default Orientation;
