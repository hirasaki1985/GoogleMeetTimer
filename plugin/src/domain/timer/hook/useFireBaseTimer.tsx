import { useFireBaseDB } from '@/domain/firebase/hooks/useFireBaseDB';
import { GoogleMeetSetting } from '@/domain/googleMeet/type/GoogleMeetSettingType';
import { TimerState } from '@/domain/timer/type/TimerType';

export const useFireBaseTimer = (
  googleMeetSetting: GoogleMeetSetting,
): TimerState | null => {
  const { data } = useFireBaseDB({ path: googleMeetSetting.meetingId });

  if (data == null) return null;
  return {
    settingTime: data?.settingTime ?? '',
    startDateTime: data?.startDateTime ?? null,
  };
};
