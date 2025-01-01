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
