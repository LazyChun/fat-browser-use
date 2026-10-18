import React from "react";
import styles from "./ScBrowserScrollWebElementNode.less";

interface ScBrowserScrollWebElementNodeProps {
  node: LogicFlow.ScBrowserScrollWebElementNode;
  i18n: I18nFn;
}

const ScBrowserScrollWebElementNode = (
  props: ScBrowserScrollWebElementNodeProps,
) => {
  const { node, i18n } = props;
  const direction = node.direction || "down";
  const selector = String(node.selector || "").trim();
  const selectorDisplay = selector || "--";
  const selectorTitle = selector || "";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserScrollWebElement.direction.title",
          )}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserScrollWebElement.direction.${direction}`,
          )}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserScrollWebElement.selector.title",
          )}
        </span>
        <span className={styles.value} title={selectorTitle}>
          {selectorDisplay}
        </span>
      </div>
    </div>
  );
};

export default ScBrowserScrollWebElementNode;
