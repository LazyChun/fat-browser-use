import React from "react";
import styles from "./ScBrowserInputTextNode.less";

interface ScBrowserInputTextNodeProps {
  node: LogicFlow.ScBrowserInputTextNode;
  i18n: I18nFn;
}

const ScBrowserInputTextNode = (props: ScBrowserInputTextNodeProps) => {
  const { node, i18n } = props;
  const selector = String(node.selector || "").trim();
  const selectorDisplay = selector || "--";
  const selectorTitle = selector || "";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text("block.flow.node.config.scBrowserInputText.text.title")}
        </span>
        <span className={styles.value} title={node.text}>
          {node.text}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserInputText.selector.title",
          )}
        </span>
        <span className={styles.value} title={selectorTitle}>
          {selectorDisplay}
        </span>
      </div>
    </div>
  );
};

export default ScBrowserInputTextNode;
