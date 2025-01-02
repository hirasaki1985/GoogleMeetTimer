import { VoiceManagerSpeakerIds, VoiceManagerTextIds } from './VoiceManagerConst'
import { VoiceManagerZundamonVoices } from './VoiceManagerZundamonConst'

/**
 * 発話する音声のテキストを取得する
 */
export const voiceManagerGetSpeechText = (
  textId: VoiceManagerTextIds,
  speakerId?: VoiceManagerSpeakerIds,
): string => {
  switch (speakerId) {
    case VoiceManagerSpeakerIds.ZundamonNormal:
    case VoiceManagerSpeakerIds.ZundamonSweet:
    case VoiceManagerSpeakerIds.ZundmonTsundere:
      return VoiceManagerZundamonVoices[textId]
  }
  return ''
}
