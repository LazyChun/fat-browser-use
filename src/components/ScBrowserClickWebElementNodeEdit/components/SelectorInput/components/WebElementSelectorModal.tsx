import React from "react";
import { Modal, Input, Button, Space, message } from "antd";
import { useI18n } from "../../../../../flowsdk";
import { useSafeState } from "ahooks";
import styles from "./WebElementSelectorModal.less";
import { AimOutlined } from "@ant-design/icons";
import { requests } from "../../../../../flowsdk";

interface WebElementSelectorModalProps {
  onSelect: (selector: string) => void;
  trigger?: React.ReactNode;
}

interface SelectorResponse {
  selector: string;
}

const WebElementSelectorModal: React.FC<WebElementSelectorModalProps> = (
  props,
) => {
  const { onSelect, trigger } = props;
  const i18n = useI18n();
  const [open, setOpen] = useSafeState(false);
  const [url, setUrl] = useSafeState("");
  const [loading, setLoading] = useSafeState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await requests.post<SelectorResponse>(
        "app/flow/startWebElementSelector",
        {
          url,
        },
      );
      if (res.isOk) {
        if (res.data && res.data.selector) {
          onSelect(res.data.selector);
          setOpen(false);
          message.success(
            i18n.text(
              "block.flow.node.config.scBrowserClickWebElement.selector.modal.success",
            ),
          );
        }
      } else {
        message.error(res.message || "Failed to start selector");
      }
    } catch (e) {
      message.error("Error starting selector");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className={styles.container}>
      <div className={styles.field}>
        <div className={styles.label}>
          {i18n.text(
            "block.flow.node.config.scBrowserClickWebElement.selector.modal.url.label",
          )}
        </div>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={i18n.text(
            "block.flow.node.config.scBrowserClickWebElement.selector.modal.url.placeholder",
          )}
        />
        <div className={styles.tip}>
          {i18n.text(
            "block.flow.node.config.scBrowserClickWebElement.selector.modal.url.tip",
          )}
        </div>
      </div>

      <div className={styles.infoBox}>
        <pre className={styles.infoText}>
          {i18n.text(
            "block.flow.node.config.scBrowserClickWebElement.selector.modal.tip",
          )}
        </pre>
      </div>
    </div>
  );

  return (
    <>
      <span onClick={() => setOpen(true)}>
        {trigger || <Button icon={<AimOutlined />} />}
      </span>
      <Modal
        title={i18n.text(
          "block.flow.node.config.scBrowserClickWebElement.selector.modal.title",
        )}
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>
              {i18n.text(
                "block.flow.node.config.scBrowserClickWebElement.selector.modal.cancel",
              )}
            </Button>
            <Button type="primary" loading={loading} onClick={handleStart}>
              {i18n.text(
                "block.flow.node.config.scBrowserClickWebElement.selector.modal.start",
              )}
            </Button>
          </Space>
        }
        width={500}
      >
        {content}
      </Modal>
    </>
  );
};

export default WebElementSelectorModal;
