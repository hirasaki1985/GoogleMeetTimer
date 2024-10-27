import { useFireBaseDBSubscribe } from '@/domain/firebase/hooks/useFireBaseDB';
import { GoogleMeetSetting } from '@/domain/googleMeet/type/GoogleMeetSettingType';
import { TimerState } from '@/features/timer/type/TimerType';
import { useMemo } from 'react';

interface FireBaseTimerValue {
  isSubscribeReady: boolean;
  timeState: TimerState | null;
}

export const useFireBaseTimer = (
  googleMeetSetting: GoogleMeetSetting,
): FireBaseTimerValue => {
  const { data, isSubscribeReady } = useFireBaseDBSubscribe({
    path: googleMeetSetting.meetingId,
  });

  if (!isSubscribeReady || data == null)
    return {
      isSubscribeReady,
      timeState: null,
    };

  // return useMemo(
  //   () => ({
  //     isSubscribeReady,
  //     timeState: {
  //       settingTime: data?.settingTime ?? '',
  //       startDateTime: data?.startDateTime ?? null,
  //     },
  //   }),
  //   [isSubscribeReady, data],
  // );
  return {
    isSubscribeReady,
    timeState: {
      settingTime: data?.settingTime ?? '',
      startDateTime: data?.startDateTime ?? null,
    },
  };
};
