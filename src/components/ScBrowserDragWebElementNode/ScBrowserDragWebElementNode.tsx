import React from "react";
import styles from "./ScBrowserDragWebElementNode.less";

interface ScBrowserDragWebElementNodeProps {
  node: LogicFlow.ScBrowserDragWebElementNode;
  i18n: I18nFn;
}

const ScBrowserDragWebElementNode = (props: ScBrowserDragWebElementNodeProps) => {
  const { node, i18n } = props;
  const action = node.action || "drag";
  const selector = String(node.selector || "").trim();
  const selectorDisplay = selector || "--";
  const selectorTitle = selector || "";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text("block.flow.node.config.scBrowserDragWebElement.action.title")}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserDragWebElement.action.${action}`
          )}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text("block.flow.node.config.scBrowserDragWebElement.selector.title")}
        </span>
        <span className={styles.value} title={selectorTitle}>
          {selectorDisplay}
        </span>
      </div>
    </div>
  );
};

export default ScBrowserDragWebElementNode;
