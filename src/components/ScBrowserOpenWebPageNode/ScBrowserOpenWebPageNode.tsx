import React from "react";
import styles from "./ScBrowserOpenWebPageNode.less";

interface ScBrowserOpenWebPageNodeProps {
  node: LogicFlow.ScBrowserOpenWebPageNode;
  i18n: I18nFn;
}

const ScBrowserOpenWebPageNode = (props: ScBrowserOpenWebPageNodeProps) => {
  const { node, i18n } = props;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text("block.flow.node.config.scBrowserOpenWebPage.openType")}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserOpenWebPage.openType.${node.openType || "default"}`
          )}
        </span>
      </div>
      {node.url && (
        <div className={styles.row}>
          <span className={styles.label}>URL</span>
          <span className={styles.value} title={node.url}>
            {node.url}
          </span>
        </div>
      )}
    </div>
  );
};

export default ScBrowserOpenWebPageNode;
