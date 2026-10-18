import React from "react";
import styles from "./ScBrowserRefreshWebPageNode.less";

interface ScBrowserRefreshWebPageNodeProps {
  node: LogicFlow.ScBrowserRefreshWebPageNode;
  i18n: I18nFn;
}

const ScBrowserRefreshWebPageNode = (props: ScBrowserRefreshWebPageNodeProps) => {
  const { node, i18n } = props;
  const refreshType = node.refreshType || "default";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserRefreshWebPage.refreshType"
          )}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserRefreshWebPage.refreshType.${refreshType}`
          )}
        </span>
      </div>
      {refreshType === "custom" && node.matchValue && (
        <div className={styles.row}>
          <span className={styles.label}>
            {i18n.text(
              "block.flow.node.config.scBrowserRefreshWebPage.matchValue"
            )}
          </span>
          <span className={styles.value} title={node.matchValue}>
            {node.matchValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default ScBrowserRefreshWebPageNode;
