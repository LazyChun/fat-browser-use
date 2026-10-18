import React, { useMemo } from "react";
import { Button } from "antd";
import { useFlowNode, useI18n } from "../../../../flowsdk";
import { FlowCollapse, VarParams } from "../../../../flowsdk";

type Pair = [string, string];

const UploadParams = () => {
  const i18n = useI18n();
  const { node, onUpdateNode, vars } =
    useFlowNode<LogicFlow.ScBrowserUploadFileNode>();

  if ((node.uploadType || "trigger") !== "url") return null;

  const pairs: Pair[] = useMemo(() => {
    const raw = node.uploadParams;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw as Pair[];
    return Object.entries(raw);
  }, [node.uploadParams]);

  const reqParams: LogicFlow.HttpReqParam[] = useMemo(() => {
    return pairs.map((p, idx) => ({
      id: String(idx),
      name: p[0] || "",
      value: p[1] || "",
    }));
  }, [pairs]);

  const handleChange = (newParams: LogicFlow.HttpReqParam[]) => {
    const nextPairs: Pair[] = newParams.map((p) => [
      p.name || "",
      p.value || "",
    ]);
    onUpdateNode({ id: node.id, uploadParams: nextPairs });
  };

  const handleAdd = () => {
    onUpdateNode({ id: node.id, uploadParams: [...pairs, ["", ""]] });
  };

  return (
    <FlowCollapse
      defaultExpand={true}
      title={i18n.text(
        "block.flow.node.config.scBrowserUploadFile.uploadParams",
      )}
      suffix={
        <Button size="small" type="link" onClick={handleAdd}>
          {i18n.text("common.add")}
        </Button>
      }
    >
      <VarParams vars={vars} reqParams={reqParams} onChange={handleChange} />
    </FlowCollapse>
  );
};

export default UploadParams;
