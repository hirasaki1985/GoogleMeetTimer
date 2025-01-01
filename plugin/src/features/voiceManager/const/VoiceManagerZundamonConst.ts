/**
 * ずんだもんが発話する音声の種類
 */
export const VoiceManagerZundamonTextIds = {
  Start: 'Start', // 開始
  OneMinuteHasPassed: 'OneMinuteHasPassed', // 一分経過
  OneMinuteLeft: 'OneMinuteLeft', // 残り一分
  End: 'End', // 終了
} as const
export type VoiceManagerZundamonTextIds =
  (typeof VoiceManagerZundamonTextIds)[keyof typeof VoiceManagerZundamonTextIds]

/**
 * ずんだもんが発話する音声のテキスト
 */
export const VoiceManagerZundamonVoices: { [key in VoiceManagerZundamonTextIds]: string } = {
  [VoiceManagerZundamonTextIds.Start]: 'さあ、始めるのだ！',
  [VoiceManagerZundamonTextIds.OneMinuteHasPassed]: '一分経過したのだ。',
  [VoiceManagerZundamonTextIds.OneMinuteLeft]: '残り一分なのだ。',
  [VoiceManagerZundamonTextIds.End]: '時間なのだ、もうおわりなのだ。',
}
