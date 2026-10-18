import React from "react";
import styles from "./ScBrowserDownloadFileNode.less";

interface ScBrowserDownloadFileNodeProps {
  node: LogicFlow.ScBrowserDownloadFileNode;
  i18n: I18nFn;
}

const ScBrowserDownloadFileNode = (props: ScBrowserDownloadFileNodeProps) => {
  const { node, i18n } = props;
  const downloadType = node.downloadType || "trigger";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserDownloadFile.downloadType",
          )}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserDownloadFile.downloadType.${downloadType}`,
          )}
        </span>
      </div>
      {downloadType === "trigger" && (
        <div className={styles.row}>
          <span className={styles.label}>
            {i18n.text(
              "block.flow.node.config.scBrowserDownloadFile.triggerSelector",
            )}
          </span>
          <span className={styles.value} title={node.triggerSelector}>
            {node.triggerSelector}
          </span>
        </div>
      )}
      {downloadType === "url" && (
        <div className={styles.row}>
          <span className={styles.label}>
            {i18n.text("block.flow.node.config.scBrowserDownloadFile.fileUrl")}
          </span>
          <span className={styles.value} title={node.fileUrl}>
            {node.fileUrl}
          </span>
        </div>
      )}
    </div>
  );
};

export default ScBrowserDownloadFileNode;
