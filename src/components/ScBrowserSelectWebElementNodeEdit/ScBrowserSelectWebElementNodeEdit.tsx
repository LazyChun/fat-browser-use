import React from "react";
import styles from "./ScBrowserSelectWebElementNodeEdit.less";
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
  SelectorInput,
  SelectType,
  ValueInput,
  Modifiers,
  DelayAfterAction,
} from "./components";

const ScBrowserSelectWebElementNodeEdit = () => {
  const i18n = useI18n();
  const { preNodes, node } =
    useFlowNode<LogicFlow.ScBrowserSelectWebElementNode>();

  return (
    <div className={styles.container}>
      <VarsInputs defaultExpand={true} preNodes={preNodes} nodeInfo={node} />
      <BlockLine />
      <FlowCollapse
        defaultExpand={true}
        title={i18n.text("block.flow.node.config.scBrowserSelectWebElement.title")}
      >
        <FatForm className={styles.form}>
          <SelectorInput />
          <SelectType />
          <ValueInput />
          <Modifiers />
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
          node.errorHandling &&
          node.errorHandling?.exceptionHandling !== "break"
        }
      />
      <BlockLine />
      <ErrorHandle />
    </div>
  );
};

export default ScBrowserSelectWebElementNodeEdit;

