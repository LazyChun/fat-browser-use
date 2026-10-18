import React from "react";
import styles from "./ScBrowserGetWebElementDataNode.less";

interface ScBrowserGetWebElementDataNodeProps {
  node: LogicFlow.ScBrowserGetWebElementDataNode;
  i18n: I18nFn;
}

const ScBrowserGetWebElementDataNode = (
  props: ScBrowserGetWebElementDataNodeProps
) => {
  const { node, i18n } = props;
  const dataType = node.dataType || "text";
  const selector = String(node.selector || "").trim();
  const selectorDisplay = selector || "--";
  const selectorTitle = selector || "";

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserGetWebElementData.dataType.title"
          )}
        </span>
        <span className={styles.value}>
          {i18n.text(
            `block.flow.node.config.scBrowserGetWebElementData.dataType.${dataType}`
          )}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserGetWebElementData.selector.title"
          )}
        </span>
        <span className={styles.value} title={selectorTitle}>
          {selectorDisplay}
        </span>
      </div>
    </div>
  );
};

export default ScBrowserGetWebElementDataNode;
