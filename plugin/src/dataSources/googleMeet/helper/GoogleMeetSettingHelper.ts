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
