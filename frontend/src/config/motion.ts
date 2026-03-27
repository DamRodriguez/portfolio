export type MotionDefaults = {
  duration?: number;
  children: React.ReactNode;
  viewAmount?: number;
  className?: string;
  order?: number;
  onClick?: () => void;
}

export const DEFAULT_MOTION = {
  duration: 0.6,
  viewAmount: 0.3,
  order: 0,
};