import React from "react";
import styles from "./ScBrowserUploadFileNode.less";

interface ScBrowserUploadFileNodeProps {
  node: LogicFlow.ScBrowserUploadFileNode;
  i18n: I18nFn;
}

const ScBrowserUploadFileNode = (props: ScBrowserUploadFileNodeProps) => {
  const { node, i18n } = props;
  const uploadType = node.uploadType || "trigger";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserUploadFile.uploadType"
          )}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserUploadFile.uploadType.${uploadType}`
          )}
        </span>
      </div>
      {uploadType === "trigger" && (
        <div className={styles.row}>
          <span className={styles.label}>
            {i18n.text(
              "block.flow.node.config.scBrowserUploadFile.triggerSelector"
            )}
          </span>
          <span className={styles.value} title={node.triggerSelector}>
            {node.triggerSelector}
          </span>
        </div>
      )}
      {uploadType === "url" && (
        <div className={styles.row}>
          <span className={styles.label}>
            {i18n.text("block.flow.node.config.scBrowserUploadFile.fileUrl")}
          </span>
          <span className={styles.value} title={node.fileUrl}>
            {node.fileUrl}
          </span>
        </div>
      )}
    </div>
  );
};

export default ScBrowserUploadFileNode;
