/**
 * 話者ID
 */
export const VoiceManagerSpeakerIds = {
  ZundamonNormal: 3,
  ZundamonSweet: 25,
  ZundmonTsundere: 26,
} as const
export type VoiceManagerSpeakerIds =
  (typeof VoiceManagerSpeakerIds)[keyof typeof VoiceManagerSpeakerIds]

/**
 * 発話する音声の種類
 */
export const VoiceManagerTextIds = {
  Start: 'Start', // 開始
  OneMinuteHasPassed: 'OneMinuteHasPassed', // 一分経過
  OneMinuteLeft: 'OneMinuteLeft', // 残り一分
  End: 'End', // 終了
} as const
export type VoiceManagerTextIds = (typeof VoiceManagerTextIds)[keyof typeof VoiceManagerTextIds]
