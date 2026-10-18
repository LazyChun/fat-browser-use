import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import ScBrowserUploadFileNode from "../components/ScBrowserUploadFileNode/ScBrowserUploadFileNode";
import ScBrowserUploadFileNodeEdit from "../components/ScBrowserUploadFileNodeEdit/ScBrowserUploadFileNodeEdit";
import { basic } from "../flowsdk";

export const scBrowserUploadFileDef: PluginFlowNodeTypeDef = {
  type: "scBrowserUploadFile",
  name: "block.flow.node.scBrowserUploadFile.defaultName",
  iconUrl: "",
  iconType: "cloudUpload",
  color: "#1677FF",
  theme: "dark",
  category: "browser",
  defaultDescription: "block.flow.type.scBrowserUploadFile.default.description",
  width: 360,
  height: 100,
  initDefaultNode: ({ node }) => {
    const tNode = node as LogicFlow.ScBrowserUploadFileNode;
    tNode.inParams = [
      { id: basic.uuid(), name: "uploadType", dataType: "string" },
      { id: basic.uuid(), name: "triggerSelector", dataType: "string" },
      { id: basic.uuid(), name: "fileUrl", dataType: "string" },
      { id: basic.uuid(), name: "requestType", dataType: "string" },
      { id: basic.uuid(), name: "uploadPath", dataType: "string" },
    ];
    tNode.uploadType = "trigger";
    tNode.triggerSelector = "";
    tNode.fileUrl = "";
    tNode.requestType = "POST";
    tNode.uploadParams = [];
    tNode.uploadPath = "";
    tNode.delayAfterAction = 0;
    const okId = basic.uuid();
    const uploadTypeId = basic.uuid();
    const filePathId = basic.uuid();
    const fileNameId = basic.uuid();
    const statusCodeId = basic.uuid();
    const respTextId = basic.uuid();
    tNode.outParams = [
      { id: okId, path: [okId], dataType: "boolean", name: "ok" },
      {
        id: uploadTypeId,
        path: [uploadTypeId],
        dataType: "string",
        name: "uploadType",
      },
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
        id: statusCodeId,
        path: [statusCodeId],
        dataType: "number",
        name: "statusCode",
      },
      {
        id: respTextId,
        path: [respTextId],
        dataType: "string",
        name: "respText",
      },
    ];
  },
  render: ScBrowserUploadFileNode,
  edit: ScBrowserUploadFileNodeEdit,
};
