namespace UI {
  export interface RightMenuItem {
    // 菜单id
    id: string;
    // 菜单标题
    title: React.ReactNode;
    // 是否禁用
    disabled?: boolean;
    // 菜单图标
    icon?: React.ReactNode;
    // 点击时间
    onClick?: (id: string) => void;
    // 快捷键
    shortcutKey?: string;
    children?: RightMenuItem[];
    // 底部分割
    bottomLine?: boolean;
  }

  export interface HighLightText {
    id: string;
    text: string;
    color: string;
    link?: string;
    // 是否新建标签页打开
    linkNewPage?: boolean;
    // 链接提示title
    linkTitle?: string;
  }

  export interface Option {
    value: string;
    label: string;
    children?: Option[];
  }

  export interface TooltipItem {
    namePrefix?: string;
    namePrefixColor?: string;
    namePrefixFontWeight?: number | string;
    name: string;
    value: string;
    color?: string;
  }

  export interface LegendDataItem {
    name: string;
    icon?: string;
  }

  export interface EChartEvent {
    offsetX: number;
    offsetY: number;
    type: "click" | string;
    event: PointerEvent;
  }

  export interface ActionShowParams {
    posX: number;
    posY: number;
    serieId: string;
    mValue: number;
    dValue?: string;
    mUnit?: string;
    xValue?: number;
    dimensions?: Query.FieldDimension[];
    startTimestamp?: string;
    endTimestamp?: string;
    width?: number;
    height?: number;
    startTime?: string;
    endTime?: string;
    relativeTime?: string;
  }

  export type ShowActionsFunc = (props: ActionShowParams) => void;

  export type ShowEChartActionsFunc = (
    serieData: Query.DataSerie,
    event: UI.EChartEvent,
    metricValue: number,
    displayMetricValue?: string,
    time?: {
      startTime?: string;
      endTime?: string;
      startTimestamp?: string;
      endTimestamp?: string;
    },
  ) => void;

  export interface Position {
    x: number;
    y: number;
    w?: number;
    h?: number;
  }
}
