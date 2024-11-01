import { GlobalTimerState } from '@/features/timer/type/TimerType';

/**
 * タイマーが開始しているかどうか
 */
export const timerHelperIsStart = (
  globalTimerState: GlobalTimerState | null | undefined,
): boolean => {
  return globalTimerState?.startDateTime != null;
};
