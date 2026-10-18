import React from "react";
import styles from "./ScBrowserDownloadFileNodeEdit.less";
import {
  ActionsAfterDone,
  BlockLine,
  ErrorHandle,
  FlowCollapse,
  VarsInputs,
  VarsOutputs,
} from "../../flowsdk";
import { useFlowNode, useI18n } from "../../flowsdk";
import { FatForm } from "../../flowsdk";
import {
  DownloadType,
  TriggerSelectorInput,
  FileUrlInput,
  DownloadPathInput,
  FileNameInput,
  DelayAfterAction,
} from "./components";

const ScBrowserDownloadFileNodeEdit = () => {
  const i18n = useI18n();
  const { preNodes, node } = useFlowNode<LogicFlow.ScBrowserDownloadFileNode>();

  return (
    <div className={styles.container}>
      <VarsInputs defaultExpand={true} preNodes={preNodes} nodeInfo={node} />
      <BlockLine />
      <FlowCollapse
        defaultExpand={true}
        title={i18n.text("block.flow.node.config.scBrowserDownloadFile.title")}
      >
        <FatForm className={styles.form}>
          <DownloadType />
          <TriggerSelectorInput />
          <FileUrlInput />
          <DownloadPathInput />
          <FileNameInput />
          <DelayAfterAction />
        </FatForm>
      </FlowCollapse>
      <BlockLine />
      <ActionsAfterDone />
      <BlockLine />
      <VarsOutputs
        defaultExpand={true}
        nodeInfo={node}
        editable={false}
        showFieldKey={false}
        createOutParamsByInParams={false}
        showErrorOutput={
          node.errorHandling && node.errorHandling?.exceptionHandling !== "break"
        }
      />
      <BlockLine />
      <ErrorHandle />
    </div>
  );
};

export default ScBrowserDownloadFileNodeEdit;

