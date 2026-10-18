import React from "react";
import styles from "./ScBrowserDragWebElementNodeEdit.less";
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
  SourceSelectorInput,
  TargetSelectorInput,
  DragAction,
  Modifiers,
  Duration,
  DelayAfterAction,
} from "./components";

const ScBrowserDragWebElementNodeEdit = () => {
  const i18n = useI18n();
  const { preNodes, node } =
    useFlowNode<LogicFlow.ScBrowserDragWebElementNode>();

  return (
    <div className={styles.container}>
      <VarsInputs defaultExpand={true} preNodes={preNodes} nodeInfo={node} />
      <BlockLine />
      <FlowCollapse
        defaultExpand={true}
        title={i18n.text("block.flow.node.config.scBrowserDragWebElement.title")}
      >
        <FatForm className={styles.form}>
          <SourceSelectorInput />
          <TargetSelectorInput />
          <DragAction />
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

export default ScBrowserDragWebElementNodeEdit;

