import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserClickWebElementNode from "../components/ScBrowserClickWebElementNode/ScBrowserClickWebElementNode";
import ScBrowserClickWebElementNodeEdit from "../components/ScBrowserClickWebElementNodeEdit/ScBrowserClickWebElementNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserClickWebElementDef: PluginFlowNodeTypeDef = {
  type: "scBrowserClickWebElement",
  name: "block.flow.node.scBrowserClickWebElement.defaultName",
  iconUrl: "",
  iconType: "record",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserClickWebElement.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserClickWebElementNode;
    tNode.inParams = [
      { id: basic.uuid(), name: "selector", dataType: "string" },
    ];
    tNode.selector = "";
    tNode.action = "click";
    tNode.modifiers = [];
    tNode.duration = 0;
    tNode.clickCount = 1;
    tNode.interval = 0;
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
  render: ScBrowserClickWebElementNode,
  edit: ScBrowserClickWebElementNodeEdit,
};
