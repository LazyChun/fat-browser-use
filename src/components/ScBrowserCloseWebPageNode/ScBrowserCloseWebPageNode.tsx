import React from "react";
import styles from "./ScBrowserCloseWebPageNode.less";

interface ScBrowserCloseWebPageNodeProps {
  node: LogicFlow.ScBrowserCloseWebPageNode;
  i18n: I18nFn;
}

const ScBrowserCloseWebPageNode = (props: ScBrowserCloseWebPageNodeProps) => {
  const { node, i18n } = props;
  const closeType = node.closeType || "all";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text("block.flow.node.config.scBrowserCloseWebPage.closeType")}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserCloseWebPage.closeType.${closeType}`
          )}
        </span>
      </div>
      {closeType === "custom" && node.matchValue && (
        <div className={styles.row}>
          <span className={styles.label}>
            {i18n.text("block.flow.node.config.scBrowserCloseWebPage.matchValue")}
          </span>
          <span className={styles.value} title={node.matchValue}>
            {node.matchValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default ScBrowserCloseWebPageNode;
