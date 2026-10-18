import React from "react";
import styles from "./ScBrowserCheckWebElementNodeEdit.less";
import { useFlowNode, useI18n } from "../../flowsdk";
import {
  ActionsAfterDone,
  BlockLine,
  ErrorHandle,
  FlowCollapse,
  VarsInputs,
  VarsOutputs,
} from "../../flowsdk";
import { FatForm } from "../../flowsdk";
import { CheckAction, DelayAfterAction, Modifiers, SelectorInput } from "./components";

const ScBrowserCheckWebElementNodeEdit = () => {
  const i18n = useI18n();
  const { preNodes, node } =
    useFlowNode<LogicFlow.ScBrowserCheckWebElementNode>();

  return (
    <div className={styles.container}>
      <VarsInputs defaultExpand={true} preNodes={preNodes} nodeInfo={node} />
      <BlockLine />
      <FlowCollapse
        defaultExpand={true}
        title={i18n.text(
          "block.flow.node.config.scBrowserCheckWebElement.title",
        )}
      >
        <FatForm className={styles.form}>
          <SelectorInput />
          <CheckAction />
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

export default ScBrowserCheckWebElementNodeEdit;
