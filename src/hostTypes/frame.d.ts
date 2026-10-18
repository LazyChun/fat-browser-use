/*
 * 宿主 Block 命名空间内的 Frame 相关全局接口（原声明位于
 * fat-notes-core/src/frontend/models/block.d.ts，宿主侧 LogicFlow.TextNode
 * 等接口不带命名空间前缀直接引用，此处按全局接口补齐，语义等价）。
 */
interface FrameBorder {
  id: string;
  color?: string;
  width?: number;
  position: "all" | "left" | "right" | "top" | "bottom";
}

interface FrameBorderRadius {
  all?: number;
  topLeft?: number;
  topRight?: number;
  bottomLeft?: number;
  bottomRight?: number;
}

interface FramePadding {
  all?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}
