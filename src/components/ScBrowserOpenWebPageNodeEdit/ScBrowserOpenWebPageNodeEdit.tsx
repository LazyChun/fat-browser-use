import React from "react";
import styles from "./ScBrowserOpenWebPageNodeEdit.less";
import {
  BlockLine,
  VarsOutputs,
  ErrorHandle,
  FlowCollapse,
  VarsInputs,
  ActionsAfterDone,
} from "../../flowsdk";
import { useFlowNode, useI18n } from "../../flowsdk";
import {
  UrlInput,
  BrowserOpenType,
  CustomOpenOptions,
  BrowserWaitType,
  BrowserWaitTime,
} from "./components";
import { FatForm } from "../../flowsdk";

const ScBrowserOpenWebPageNodeEdit = () => {
  const i18n = useI18n();
  const { preNodes, onUpdateNode, node } =
    useFlowNode<LogicFlow.ScBrowserOpenWebPageNode>();
  return (
    <div className={styles.container}>
      <VarsInputs defaultExpand={true} preNodes={preNodes} nodeInfo={node} />
      <BlockLine />
      <FlowCollapse
        defaultExpand={true}
        title={i18n.text("block.flow.node.config.scBrowserOpenWebPage.title")}
      >
        <FatForm className={styles.form}>
          <UrlInput />
          <BrowserOpenType />
          <CustomOpenOptions />
          <BrowserWaitType />
          <BrowserWaitTime />
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
          node.errorHandling &&
          node.errorHandling?.exceptionHandling !== "break"
        }
      />
      <BlockLine />
      <ErrorHandle />
    </div>
  );
};

export default ScBrowserOpenWebPageNodeEdit;
