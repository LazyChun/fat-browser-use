import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserDragWebElementNode from "../components/ScBrowserDragWebElementNode/ScBrowserDragWebElementNode";
import ScBrowserDragWebElementNodeEdit from "../components/ScBrowserDragWebElementNodeEdit/ScBrowserDragWebElementNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserDragWebElementDef: PluginFlowNodeTypeDef = {
  type: "scBrowserDragWebElement",
  name: "block.flow.node.scBrowserDragWebElement.defaultName",
  iconUrl: "",
  iconType: "gripper",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserDragWebElement.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserDragWebElementNode;
    tNode.inParams = [
      { id: basic.uuid(), name: "selector", dataType: "string" },
      { id: basic.uuid(), name: "targetSelector", dataType: "string" },
    ];
    tNode.selector = "";
    tNode.targetSelector = "";
    tNode.action = "drag";
    tNode.modifiers = [];
    tNode.duration = 0;
    tNode.delayAfterAction = 0;
    const timeUsedId = basic.uuid();
    tNode.outParams = [
      {
        id: timeUsedId,
        path: [timeUsedId],
        dataType: "number",
        name: "time_used(ms)",
      },
    ];
  },
  render: ScBrowserDragWebElementNode,
  edit: ScBrowserDragWebElementNodeEdit,
};
