import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserInputTextNode from "../components/ScBrowserInputTextNode/ScBrowserInputTextNode";
import ScBrowserInputTextNodeEdit from "../components/ScBrowserInputTextNodeEdit/ScBrowserInputTextNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserInputTextDef: PluginFlowNodeTypeDef = {
  type: "scBrowserInputText",
  name: "block.flow.node.scBrowserInputText.defaultName",
  iconUrl: "",
  iconType: "edit",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserInputText.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserInputTextNode;
    tNode.inParams = [
      { id: basic.uuid(), name: "selector", dataType: "string" },
      { id: basic.uuid(), name: "text", dataType: "string" },
    ];
    tNode.selector = "";
    tNode.text = "";
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
  render: ScBrowserInputTextNode,
  edit: ScBrowserInputTextNodeEdit,
};
