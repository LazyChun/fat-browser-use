import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserDownloadFileNode from "../components/ScBrowserDownloadFileNode/ScBrowserDownloadFileNode";
import ScBrowserDownloadFileNodeEdit from "../components/ScBrowserDownloadFileNodeEdit/ScBrowserDownloadFileNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserDownloadFileDef: PluginFlowNodeTypeDef = {
  type: "scBrowserDownloadFile",
  name: "block.flow.node.scBrowserDownloadFile.defaultName",
  iconUrl: "",
  iconType: "desktopDownload",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserDownloadFile.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserDownloadFileNode;
    tNode.inParams = [
      { id: basic.uuid(), name: "downloadType", dataType: "string" },
      { id: basic.uuid(), name: "triggerSelector", dataType: "string" },
      { id: basic.uuid(), name: "fileUrl", dataType: "string" },
      { id: basic.uuid(), name: "downloadPath", dataType: "string" },
      { id: basic.uuid(), name: "fileName", dataType: "string" },
    ];
    tNode.downloadType = "trigger";
    tNode.triggerSelector = "";
    tNode.fileUrl = "";
    tNode.downloadPath = "";
    tNode.fileName = "";
    tNode.delayAfterAction = 0;
    const filePathId = basic.uuid();
    const fileNameId = basic.uuid();
    const downloadPathId = basic.uuid();
    tNode.outParams = [
      {
        id: filePathId,
        path: [filePathId],
        dataType: "string",
        name: "filePath",
      },
      {
        id: fileNameId,
        path: [fileNameId],
        dataType: "string",
        name: "fileName",
      },
      {
        id: downloadPathId,
        path: [downloadPathId],
        dataType: "string",
        name: "downloadPath",
      },
    ];
  },
  render: ScBrowserDownloadFileNode,
  edit: ScBrowserDownloadFileNodeEdit,
};
