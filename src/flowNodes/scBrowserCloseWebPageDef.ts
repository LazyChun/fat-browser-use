import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserCloseWebPageNode from "../components/ScBrowserCloseWebPageNode/ScBrowserCloseWebPageNode";
import ScBrowserCloseWebPageNodeEdit from "../components/ScBrowserCloseWebPageNodeEdit/ScBrowserCloseWebPageNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserCloseWebPageDef: PluginFlowNodeTypeDef = {
  type: "scBrowserCloseWebPage",
  name: "block.flow.node.scBrowserCloseWebPage.defaultName",
  iconUrl: "",
  iconType: "close",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserCloseWebPage.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserCloseWebPageNode;
    tNode.inParams = [{ id: basic.uuid(), name: "input", dataType: "string" }];
    tNode.closeType = "all";
    tNode.browser = "all";
    tNode.customCloseType = "autoMatch";
    tNode.isExactMatch = false;
    tNode.matchValue = "";
    tNode.delayAfterAction = 0;
    const urlsId = basic.uuid();
    tNode.outParams = [
      {
        id: urlsId,
        path: [urlsId],
        dataType: "arrString",
        name: "closed_urls",
      },
    ];
  },
  render: ScBrowserCloseWebPageNode,
  edit: ScBrowserCloseWebPageNodeEdit,
};
