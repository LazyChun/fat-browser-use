import React from "react";
import styles from "./ScBrowserSelectWebElementNode.less";

interface ScBrowserSelectWebElementNodeProps {
  node: LogicFlow.ScBrowserSelectWebElementNode;
  i18n: I18nFn;
}

const ScBrowserSelectWebElementNode = (props: ScBrowserSelectWebElementNodeProps) => {
  const { node, i18n } = props;
  const selectType = node.selectType || "value";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserSelectWebElement.selectType.title"
          )}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserSelectWebElement.selectType.${selectType}`
          )}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text("block.flow.node.config.scBrowserSelectWebElement.value.title")}
        </span>
        <span className={styles.value} title={node.value}>
          {node.value}
        </span>
      </div>
    </div>
  );
};

export default ScBrowserSelectWebElementNode;
