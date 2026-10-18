namespace Query {
  // 分页列表
  export interface PaginationResult<T> {
    // 总数
    count?: number;
    // 列表
    items?: T[];
  }

  // 分页
  export interface Pagination {
    // 每页查询条数
    pageSize: number;
    // 页码
    page: number;
    // 排序字段
    sort?: string;
    // 排序方式
    order?: string;
  }

  export interface FieldMeta {
    // 蜡烛图值类型  open-开盘价 close-关盘价 high-最高价 low-最低价
    //candleValueType?: "open" | "close" | "high" | "low" | string;
  }

  export interface FieldDimension {
    // 维度名称
    name: string;
    // 维度值
    value?: string;
    // 数据源id
    dsItemId: string;
    // 数据表id
    dsTableId: string;
    // 数据列id
    dsColId: string;
    // 数据列名称
    dbColName: string;
  }

  export interface Field {
    id: string;
    // 查询引用标识，对应 Block.Query.refId
    queryRefId?: string;
    // 数据名称  维度列名称
    name: string;
    // 列类型 metric-指标 dimension-维度
    colType: string;
    // 数据类型 number-数字  time-时间  第一行时间为x轴时间
    dataType: string;
    // 数据维度
    dimensions?: FieldDimension[];
    // 单位
    unit?: string;
    //精度
    precision?: number;
    // 表达式对应的fields 只有在为表达式数据时，才有值
    expressFields?: ExpressField[];
  }

  export type Value = number | null | undefined | string | Date;

  export type Values = Value[];

  export interface ExpressField {
    // 对应fieldId
    fieldId: string;
    // 查询引用标识，对应 Block.Query.refId
    queryRefId: string;
  }

  export interface FrameData {
    // frame类型 normal-普通数据  displayCol-反选列 （如实体，标签数据需要反选名称）
    type: string;
    values: Values[];
    fields: Field[];
    // 分组key值,方便后续计算表达式 只有指标FrameData有
    groupKey?: string;
    // 表达式对应的fields 只有在为表达式数据时，才有值
    expressFields?: ExpressField[];
  }

  // 查询返回数据
  export interface QueryData {
    queryId: string;
    queryRefId: string;
    // 数据查询状态  正常情况为200
    status: number;
    // 数据集
    frames: FrameData[];
  }

  // 卡片返回数据结构
  type WidgetDataResp = QueryData[];

  export interface DataSerie {
    // serieId
    id: string;
    queryId: string;
    queryRefId: string;
    // 指标名称
    metricNames?: string[];
    // serie名称
    name: string;
    // 单位
    unit?: string;
    // 大数字转换
    valueConversion?: boolean;
    // 英文单位
    enUnit?: boolean;
    // 自动进位
    autoCarryOverOfUnits?: boolean;
    //精度
    precision?: number;
    // 维度
    dimensions?: FieldDimension[];
  }

  // 查询返回数据
  export interface QueryData {
    queryId: string;
    queryRefId: string;
    // 数据查询状态  正常情况为200
    status: number;
    // 数据集
    frames: FrameData[];
  }

  // Block返回数据结构
  type BlockDataResp = QueryData[];
}
