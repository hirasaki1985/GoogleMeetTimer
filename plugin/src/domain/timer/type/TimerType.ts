export interface TimerState {
  settingTime: string; // HH:mm:ss 設定時間。この時間から徐々に減っていき0分となる
  startDateTime: string | null; // null = 停止中、日時 = 開始した時間
}
export const initTimerState = (): TimerState => ({
  settingTime: '',
  startDateTime: null,
});
