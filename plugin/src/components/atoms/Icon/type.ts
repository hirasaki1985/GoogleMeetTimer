export const IconType = {
  Draggable: 'Draggable',
} as const;
export type IconType = (typeof IconType)[keyof typeof IconType];

export interface IconProps {
  type: IconType;
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  disabledColor?: string;
}
