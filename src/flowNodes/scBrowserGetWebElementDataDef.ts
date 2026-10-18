import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserGetWebElementDataNode from "../components/ScBrowserGetWebElementDataNode/ScBrowserGetWebElementDataNode";
import ScBrowserGetWebElementDataNodeEdit from "../components/ScBrowserGetWebElementDataNodeEdit/ScBrowserGetWebElementDataNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserGetWebElementDataDef: PluginFlowNodeTypeDef = {
  type: "scBrowserGetWebElementData",
  name: "block.flow.node.scBrowserGetWebElementData.defaultName",
  iconUrl: "",
  iconType: "json",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserGetWebElementData.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserGetWebElementDataNode;
    tNode.inParams = [
      { id: basic.uuid(), name: "selector", dataType: "string" },
    ];
    tNode.selector = "";
    tNode.dataType = "text";
    tNode.delayAfterAction = 0;
    const outId = basic.uuid();
    tNode.outParams = [
      {
        id: outId,
        path: [outId],
        dataType: "string",
        name: "data",
      },
    ];
  },
  render: ScBrowserGetWebElementDataNode,
  edit: ScBrowserGetWebElementDataNodeEdit,
};
