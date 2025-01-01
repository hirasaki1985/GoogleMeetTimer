import { VoiceManagerTextIds } from './VoiceManagerConst'

/**
 * ずんだもんが発話する音声のテキスト
 */
export const VoiceManagerZundamonVoices: { [key in VoiceManagerTextIds]: string } = {
  [VoiceManagerTextIds.Start]: 'さあ、始めるのだ！',
  [VoiceManagerTextIds.OneMinuteHasPassed]: '一分経過したのだ。',
  [VoiceManagerTextIds.OneMinuteLeft]: '残り一分なのだ。',
  [VoiceManagerTextIds.End]: '時間なのだ、もうおわりなのだ。',
}
