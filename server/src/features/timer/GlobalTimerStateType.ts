import { VoiceManagerTextIds } from '../VoiceManager/VoiceManagerConst'

/**
 * 参加者全体で共有する状態
 */
export interface GlobalTimerState {
  settingTime: string // mm:ss 設定時間。この時間から徐々に減っていき0分となる
  startDateTime: string | null // null = 停止中、日時 = 開始した時間 // 2024-11-01T01:32:29.367Z
  voices: GlobalTimerVoiceState | null // 音声管理
}
export const initGlobalTimerState = (): GlobalTimerState => ({
  settingTime: '',
  startDateTime: null,
  voices: initGlobalTimerStateVoiceUrls(),
})

/**
 * 音声データを管理する
 */
export interface GlobalTimerVoiceState {
  zundamon: {
    files: {
      [key in VoiceManagerTextIds]: {
        url: string // 認証付きURL
        updatedAt: string // 更新日時
      }
    }
  }
}
export interface GlobalTimerVoiceItem {
  url: string // 認証付きURL
  updatedAt: string // 更新日時
}
export const initGlobalTimerVoiceItem = (): GlobalTimerVoiceItem => ({
  url: '',
  updatedAt: '',
})

export const initGlobalTimerStateVoiceUrls = (): GlobalTimerVoiceState => ({
  zundamon: {
    files: {
      [VoiceManagerTextIds.Start]: initGlobalTimerVoiceItem(),
      [VoiceManagerTextIds.OneMinuteHasPassed]: initGlobalTimerVoiceItem(),
      [VoiceManagerTextIds.OneMinuteLeft]: initGlobalTimerVoiceItem(),
      [VoiceManagerTextIds.End]: initGlobalTimerVoiceItem(),
    },
  },
})
