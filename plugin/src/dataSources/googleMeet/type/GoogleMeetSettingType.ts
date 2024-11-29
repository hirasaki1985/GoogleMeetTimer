/**
 * GoogleMeetの設定値(全体)
 */
export interface GoogleMeetSetting {
  meetingId: string
}
export const initGoogleMeetSetting = (): GoogleMeetSetting => ({
  meetingId: '',
})
