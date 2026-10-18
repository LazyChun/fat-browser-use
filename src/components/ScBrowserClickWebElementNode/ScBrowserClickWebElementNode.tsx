import React from "react";
import styles from "./ScBrowserClickWebElementNode.less";

interface ScBrowserClickWebElementNodeProps {
  node: LogicFlow.ScBrowserClickWebElementNode;
  i18n: I18nFn;
}

const ScBrowserClickWebElementNode = (
  props: ScBrowserClickWebElementNodeProps,
) => {
  const { node, i18n } = props;
  const action = node.action || "click";
  const selector = String(node.selector || "").trim();
  const selectorDisplay = selector || "--";
  const selectorTitle = selector || "";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserClickWebElement.action.title",
          )}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserClickWebElement.action.${action}`,
          )}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserClickWebElement.selector.title",
          )}
        </span>
        <span className={styles.value} title={selectorTitle}>
          {selectorDisplay}
        </span>
      </div>
    </div>
  );
};

export default ScBrowserClickWebElementNode;
