import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserOpenWebPageNode from "../components/ScBrowserOpenWebPageNode/ScBrowserOpenWebPageNode";
import ScBrowserOpenWebPageNodeEdit from "../components/ScBrowserOpenWebPageNodeEdit/ScBrowserOpenWebPageNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserOpenWebPageDef: PluginFlowNodeTypeDef = {
  type: "scBrowserOpenWebPage",
  name: "block.flow.node.scBrowserOpenWebPage.defaultName",
  iconUrl: "",
  iconType: "browser",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserOpenWebPage.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserOpenWebPageNode;
    tNode.inParams = [{ id: basic.uuid(), name: "input", dataType: "string" }];
    tNode.url = "";
    tNode.delayAfterAction = 0;
    const urlId = basic.uuid();
    const pageTitleId = basic.uuid();
    tNode.outParams = [
      {
        id: urlId,
        path: [urlId],
        dataType: "string",
        name: "url",
      },
      {
        id: pageTitleId,
        path: [pageTitleId],
        dataType: "string",
        name: "web_page_title",
      },
    ];
  },
  render: ScBrowserOpenWebPageNode,
  edit: ScBrowserOpenWebPageNodeEdit,
};
