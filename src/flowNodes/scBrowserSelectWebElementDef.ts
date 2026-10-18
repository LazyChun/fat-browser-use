import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserSelectWebElementNode from "../components/ScBrowserSelectWebElementNode/ScBrowserSelectWebElementNode";
import ScBrowserSelectWebElementNodeEdit from "../components/ScBrowserSelectWebElementNodeEdit/ScBrowserSelectWebElementNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserSelectWebElementDef: PluginFlowNodeTypeDef = {
  type: "scBrowserSelectWebElement",
  name: "block.flow.node.scBrowserSelectWebElement.defaultName",
  iconUrl: "",
  iconType: "listSelection",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserSelectWebElement.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserSelectWebElementNode;
    tNode.inParams = [
      { id: basic.uuid(), name: "selector", dataType: "string" },
      { id: basic.uuid(), name: "selectType", dataType: "string" },
      { id: basic.uuid(), name: "value", dataType: "string" },
    ];
    tNode.selector = "";
    tNode.selectType = "value";
    tNode.value = "";
    tNode.modifiers = [];
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
  render: ScBrowserSelectWebElementNode,
  edit: ScBrowserSelectWebElementNodeEdit,
};
