import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserCheckWebElementNode from "../components/ScBrowserCheckWebElementNode/ScBrowserCheckWebElementNode";
import ScBrowserCheckWebElementNodeEdit from "../components/ScBrowserCheckWebElementNodeEdit/ScBrowserCheckWebElementNodeEdit";

export const scBrowserCheckWebElementDef: PluginFlowNodeTypeDef = {
  type: "scBrowserCheckWebElement",
  name: "block.flow.node.scBrowserCheckWebElement.defaultName",
  iconUrl: "",
  iconType: "pass",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserCheckWebElement.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserCheckWebElementNode;
    tNode.selector = "";
    tNode.action = "check";
    tNode.modifiers = [];
    tNode.delayAfterAction = 0;
  },
  render: ScBrowserCheckWebElementNode,
  edit: ScBrowserCheckWebElementNodeEdit,
};
