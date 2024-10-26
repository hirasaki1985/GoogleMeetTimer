import { GoogleMeetSetting } from '@/domain/googleMeet/type/GoogleMeetSettingType';

/**
 * DB: google meet stateを管理するパスを取得する
 */
export const timerHelperGetDBMeetingPath = (
  googleMeetSetting: GoogleMeetSetting,
): string => {
  return `/${googleMeetSetting.meetingId}`;
};
