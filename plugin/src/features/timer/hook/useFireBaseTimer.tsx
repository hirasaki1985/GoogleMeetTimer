import { useFireBaseDBSubscribe } from '@/domain/firebase/hooks/useFireBaseDB';
import { GoogleMeetSetting } from '@/domain/googleMeet/type/GoogleMeetSettingType';
import { GlobalTimerState } from '@/features/timer/type/TimerType';
import { googleMeetSettingGetDBMeetingPath } from '@/domain/googleMeet/helper/GoogleMeetSettingHelper';

interface FireBaseTimerValue {
  isSubscribeReady: boolean;
  globalTimerState: GlobalTimerState | null;
}

export const useFireBaseTimer = (
  googleMeetSetting: GoogleMeetSetting,
): FireBaseTimerValue => {
  const { data, isSubscribeReady } = useFireBaseDBSubscribe({
    path: googleMeetSettingGetDBMeetingPath(googleMeetSetting.meetingId),
  });

  if (!isSubscribeReady || data == null)
    return {
      isSubscribeReady,
      globalTimerState: null,
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
    globalTimerState: {
      settingTime: data?.settingTime ?? '',
      startDateTime: data?.startDateTime ?? null,
    },
  };
};
