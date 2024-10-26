import { useFireBaseDBSubscribe } from '@/domain/firebase/hooks/useFireBaseDB';
import { GoogleMeetSetting } from '@/domain/googleMeet/type/GoogleMeetSettingType';
import { TimerState } from '@/features/timer/type/TimerType';

export const useFireBaseTimer = (
  googleMeetSetting: GoogleMeetSetting,
): TimerState | null => {
  const { data } = useFireBaseDBSubscribe({
    path: googleMeetSetting.meetingId,
  });

  console.log('useFireBaseTimer response data', data);
  if (data == null) return null;
  return {
    settingTime: data?.settingTime ?? '',
    startDateTime: data?.startDateTime ?? null,
  };
};
