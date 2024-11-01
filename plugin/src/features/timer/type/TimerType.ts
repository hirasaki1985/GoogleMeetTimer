/**
 * 参加者全体で共有する状態
 */
export interface GlobalTimerState {
  settingTime: string; // mm:ss 設定時間。この時間から徐々に減っていき0分となる
  startDateTime: string | null; // null = 停止中、日時 = 開始した時間 // 2024-11-01T01:32:29.367Z
}
export const initGlobalTimerState = (): GlobalTimerState => ({
  settingTime: '',
  startDateTime: null,
});

/**
 * 個別で管理する状態
 */
export interface LocalTimerState {
  displayTime: string; // 開始時に表示する時間
}
export const initLocalTimerState = (): LocalTimerState => ({
  displayTime: '',
});
