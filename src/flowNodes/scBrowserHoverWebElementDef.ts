import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserHoverWebElementNode from "../components/ScBrowserHoverWebElementNode/ScBrowserHoverWebElementNode";
import ScBrowserHoverWebElementNodeEdit from "../components/ScBrowserHoverWebElementNodeEdit/ScBrowserHoverWebElementNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserHoverWebElementDef: PluginFlowNodeTypeDef = {
  type: "scBrowserHoverWebElement",
  name: "block.flow.node.scBrowserHoverWebElement.defaultName",
  iconUrl: "",
  iconType: "preview",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserHoverWebElement.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserHoverWebElementNode;
    tNode.inParams = [
      { id: basic.uuid(), name: "selector", dataType: "string" },
    ];
    tNode.selector = "";
    tNode.action = "hover";
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
  render: ScBrowserHoverWebElementNode,
  edit: ScBrowserHoverWebElementNodeEdit,
};
