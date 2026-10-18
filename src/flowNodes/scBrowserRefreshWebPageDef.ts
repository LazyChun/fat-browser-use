import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserRefreshWebPageNode from "../components/ScBrowserRefreshWebPageNode/ScBrowserRefreshWebPageNode";
import ScBrowserRefreshWebPageNodeEdit from "../components/ScBrowserRefreshWebPageNodeEdit/ScBrowserRefreshWebPageNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserRefreshWebPageDef: PluginFlowNodeTypeDef = {
  type: "scBrowserRefreshWebPage",
  name: "block.flow.node.scBrowserRefreshWebPage.defaultName",
  iconUrl: "",
  iconType: "debugRestart",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserRefreshWebPage.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserRefreshWebPageNode;
    tNode.inParams = [{ id: basic.uuid(), name: "input", dataType: "string" }];
    tNode.refreshType = "default";
    tNode.customRefreshType = undefined;
    tNode.browser = "default";
    tNode.matchType = undefined;
    tNode.isExactMatch = false;
    tNode.matchValue = undefined;
    tNode.delayAfterAction = 0;
    const urlsId = basic.uuid();
    tNode.outParams = [
      {
        id: urlsId,
        path: [urlsId],
        dataType: "arrString",
        name: "refresh_urls",
      },
    ];
  },
  render: ScBrowserRefreshWebPageNode,
  edit: ScBrowserRefreshWebPageNodeEdit,
};
