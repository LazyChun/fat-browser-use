import React from "react";
import styles from "./ScBrowserRefreshWebPageNodeEdit.less";
import {
  BlockLine,
  VarsOutputs,
  ErrorHandle,
  FlowCollapse,
  VarsInputs,
  ActionsAfterDone,
} from "../../flowsdk";
import { useFlowNode, useI18n } from "../../flowsdk";
import { FatForm } from "../../flowsdk";
import {
  RefreshType,
  CustomRefreshType,
  MatchType,
  Browser,
  ExactMatch,
  MatchValue,
} from "./components";

const ScBrowserRefreshWebPageNodeEdit = () => {
  const i18n = useI18n();
  const { preNodes, node } =
    useFlowNode<LogicFlow.ScBrowserRefreshWebPageNode>();

  return (
    <div className={styles.container}>
      <VarsInputs defaultExpand={true} preNodes={preNodes} nodeInfo={node} />
      <BlockLine />
      <FlowCollapse
        defaultExpand={true}
        title={i18n.text(
          "block.flow.node.config.scBrowserRefreshWebPage.title",
        )}
      >
        <FatForm className={styles.form}>
          <RefreshType />
          <CustomRefreshType />
          <MatchType />
          <Browser />
          <ExactMatch />
          <MatchValue />
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

export default ScBrowserRefreshWebPageNodeEdit;
