import { VoiceManagerTextIds } from '../VoiceManager/VoiceManagerConst'

/**
 * const
 */
// ミーティングの設定を保存するルートパス
const BaseMeetingPath = '/meetings'

/**
 * DB: google meet stateを管理するパスを取得する
 */
export const googleMeetSettingGetDBMeetingPath = (meetingId: string): string => {
  return `${BaseMeetingPath}/${meetingId}`
}

/**
 * DB: mp3ファイルへのパスを取得する
 */
export const googleMeetSettingGetDBVoiceMp3FilePath = (
  meetingId: string,
  textId: VoiceManagerTextIds,
): string => {
  return `${googleMeetSettingGetDBMeetingPath(meetingId)}/voices/zundamon/files/${textId}`
}
