import React from "react";
import styles from "./ScBrowserScrollWebElementNodeEdit.less";
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
  ActionType,
  DelayAfterAction,
  Direction,
  Duration,
  Modifiers,
  Orientation,
  SelectorInput,
} from "./components";

const ScBrowserScrollWebElementNodeEdit = () => {
  const i18n = useI18n();
  const { preNodes, node } =
    useFlowNode<LogicFlow.ScBrowserScrollWebElementNode>();

  return (
    <div className={styles.container}>
      <VarsInputs defaultExpand={true} preNodes={preNodes} nodeInfo={node} />
      <BlockLine />
      <FlowCollapse
        defaultExpand={true}
        title={i18n.text("block.flow.node.config.scBrowserScrollWebElement.title")}
      >
        <FatForm className={styles.form}>
          <SelectorInput />
          <ActionType />
          <Orientation />
          <Direction />
          <Modifiers />
          <Duration />
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

export default ScBrowserScrollWebElementNodeEdit;
