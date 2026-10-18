import React from "react";
import styles from "./ScBrowserUploadFileNodeEdit.less";
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
  UploadType,
  TriggerSelectorInput,
  FileUrlInput,
  RequestType,
  UploadParams,
  UploadPathInput,
  DelayAfterAction,
} from "./components";

const ScBrowserUploadFileNodeEdit = () => {
  const i18n = useI18n();
  const { preNodes, node } = useFlowNode<LogicFlow.ScBrowserUploadFileNode>();

  return (
    <div className={styles.container}>
      <VarsInputs defaultExpand={true} preNodes={preNodes} nodeInfo={node} />
      <BlockLine />
      <FlowCollapse
        defaultExpand={true}
        title={i18n.text("block.flow.node.config.scBrowserUploadFile.title")}
      >
        <FatForm className={styles.form}>
          <UploadType />
          <TriggerSelectorInput />
          <FileUrlInput />
          <RequestType />
          <UploadParams />
          <UploadPathInput />
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

export default ScBrowserUploadFileNodeEdit;

