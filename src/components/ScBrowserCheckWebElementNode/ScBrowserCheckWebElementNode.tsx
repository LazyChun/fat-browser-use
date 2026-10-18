import React, { useMemo } from "react";
import styles from "./ScBrowserCheckWebElementNode.less";

interface ScBrowserCheckWebElementNodeProps {
  node: LogicFlow.ScBrowserCheckWebElementNode;
  i18n: I18nFn;
}

const ScBrowserCheckWebElementNode = (props: ScBrowserCheckWebElementNodeProps) => {
  const { node, i18n } = props;
  const selector = String(node.selector || "").trim();
  const selectorDisplay = selector || "--";
  const selectorTitle = selector || "";

  const actionText = useMemo(() => {
    const action = node.action ?? "check";
    if (action === "check" || action === "uncheck") {
      return i18n.text(
        `block.flow.node.config.scBrowserCheckWebElement.action.${action}`,
      );
    }
    return action;
  }, [node.action, i18n.locale]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text("block.flow.node.config.scBrowserCheckWebElement.selector.title")}
        </span>
        <span className={styles.value} title={selectorTitle}>
          {selectorDisplay}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>
          {i18n.text("block.flow.node.config.scBrowserCheckWebElement.action.title")}
        </span>
        <span className={styles.value}>{actionText}</span>
      </div>
    </div>
  );
};

export default ScBrowserCheckWebElementNode;
