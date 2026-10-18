import type { PluginFlowNodeTypeDef } from "fat-notes-sdk";
import { scBrowserOpenWebPageDef } from "./scBrowserOpenWebPageDef";
import { scBrowserCloseWebPageDef } from "./scBrowserCloseWebPageDef";
import { scBrowserRefreshWebPageDef } from "./scBrowserRefreshWebPageDef";
import { scBrowserCheckWebElementDef } from "./scBrowserCheckWebElementDef";
import { scBrowserClickWebElementDef } from "./scBrowserClickWebElementDef";
import { scBrowserHoverWebElementDef } from "./scBrowserHoverWebElementDef";
import { scBrowserInputTextDef } from "./scBrowserInputTextDef";
import { scBrowserSelectWebElementDef } from "./scBrowserSelectWebElementDef";
import { scBrowserDragWebElementDef } from "./scBrowserDragWebElementDef";
import { scBrowserScrollWebElementDef } from "./scBrowserScrollWebElementDef";
import { scBrowserGetWebElementDataDef } from "./scBrowserGetWebElementDataDef";
import { scBrowserDownloadFileDef } from "./scBrowserDownloadFileDef";
import { scBrowserUploadFileDef } from "./scBrowserUploadFileDef";

export const flowNodeDefs: PluginFlowNodeTypeDef[] = [
  scBrowserOpenWebPageDef,
  scBrowserCloseWebPageDef,
  scBrowserRefreshWebPageDef,
  scBrowserCheckWebElementDef,
  scBrowserClickWebElementDef,
  scBrowserHoverWebElementDef,
  scBrowserInputTextDef,
  scBrowserSelectWebElementDef,
  scBrowserDragWebElementDef,
  scBrowserScrollWebElementDef,
  scBrowserGetWebElementDataDef,
  scBrowserDownloadFileDef,
  scBrowserUploadFileDef,
];
