import { GlobalTimerState } from '@/features/timer/type/TimerType';
import dayjs, { Dayjs } from 'dayjs';

/**
 * タイマーが開始しているかどうか
 */
export const timerHelperIsStart = (
  globalTimerState: GlobalTimerState | null | undefined,
): boolean => {
  return globalTimerState?.startDateTime != null;
};

/**
 * タイマーが開始してからの残り時間を計算する
 */
export const timeHelperGetRestTime = (
  globalTimerState: GlobalTimerState | null | undefined,
  now: Dayjs | string = dayjs(),
): string => {
  if (!globalTimerState || !globalTimerState.settingTime) return '00:00';

  const { settingTime, startDateTime } = globalTimerState;

  // 初期設定の分・秒を取得して、合計秒に変換
  const [initialMinutes, initialSeconds] = settingTime.split(':').map(Number);
  const initialTotalSeconds = initialMinutes * 60 + initialSeconds;

  // タイマーが停止中であれば設定時間をそのまま返す
  if (!startDateTime) return settingTime;

  // 現在時間と開始時間から経過秒数を計算
  const elapsedSeconds = dayjs(now).diff(dayjs(startDateTime), 'second');

  // 残り時間を計算
  const remainingSeconds = initialTotalSeconds - elapsedSeconds;
  if (remainingSeconds <= 0) return '00:00'; // タイマー終了

  // 分と秒に変換してフォーマット
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingDisplaySeconds = remainingSeconds % 60;

  return `${String(remainingMinutes).padStart(2, '0')}:${String(remainingDisplaySeconds).padStart(2, '0')}`;
};
