import React from "react";
import styles from "./ScBrowserHoverWebElementNode.less";

interface ScBrowserHoverWebElementNodeProps {
  node: LogicFlow.ScBrowserHoverWebElementNode;
  i18n: I18nFn;
}

const ScBrowserHoverWebElementNode = (
  props: ScBrowserHoverWebElementNodeProps,
) => {
  const { node, i18n } = props;
  const action = node.action || "hover";
  const selector = String(node.selector || "").trim();
  const selectorDisplay = selector || "--";
  const selectorTitle = selector || "";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserHoverWebElement.action.title",
          )}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserHoverWebElement.action.${action}`,
          )}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserHoverWebElement.selector.title",
          )}
        </span>
        <span className={styles.value} title={selectorTitle}>
          {selectorDisplay}
        </span>
      </div>
    </div>
  );
};

export default ScBrowserHoverWebElementNode;
