import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserScrollWebElementNode from "../components/ScBrowserScrollWebElementNode/ScBrowserScrollWebElementNode";
import ScBrowserScrollWebElementNodeEdit from "../components/ScBrowserScrollWebElementNodeEdit/ScBrowserScrollWebElementNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserScrollWebElementDef: PluginFlowNodeTypeDef = {
  type: "scBrowserScrollWebElement",
  name: "block.flow.node.scBrowserScrollWebElement.defaultName",
  iconUrl: "",
  iconType: "arrowBoth",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserScrollWebElement.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserScrollWebElementNode;
    tNode.inParams = [
      { id: basic.uuid(), name: "selector", dataType: "string" },
    ];
    tNode.selector = "";
    tNode.actionType = "mouseScroll";
    tNode.orientation = "vertical";
    tNode.direction = "down";
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
  render: ScBrowserScrollWebElementNode,
  edit: ScBrowserScrollWebElementNodeEdit,
};
