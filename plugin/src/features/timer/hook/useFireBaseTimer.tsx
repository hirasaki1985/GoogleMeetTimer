import {
  useFireBaseDBSubscribe,
  useFirebaseDBUpdate,
  useFirebaseDBWrite,
} from '@/dataSources/firebase/hook/useFireBaseDB'
import { GoogleMeetSetting } from '@/dataSources/googleMeet/type/GoogleMeetSettingType'
import { GlobalTimerState } from '@/features/timer/type/TimerType'
import { googleMeetSettingGetDBMeetingPath } from '@/dataSources/googleMeet/helper/GoogleMeetSettingHelper'
import { useCallback } from 'react'

interface FireBaseTimerValue {
  isSubscribeReady: boolean
  globalTimerState: GlobalTimerState | null
}

/**
 * firebaseのDBを更新する
 */
export const useUpdateFireBaseTimer = () => {
  // hooks
  const dbWrite = useFirebaseDBWrite()
  const dbUpdate = useFirebaseDBUpdate()

  return useCallback(
    async (googleMeetSetting: GoogleMeetSetting, globalTimerState: GlobalTimerState) => {
      return await dbUpdate(
        googleMeetSettingGetDBMeetingPath(googleMeetSetting?.meetingId),
        globalTimerState,
      )
    },
    [dbWrite, dbUpdate],
  )
}

/**
 * firebaseのDBをサブスクライブする
 */
export const useFireBaseTimer = (googleMeetSetting: GoogleMeetSetting): FireBaseTimerValue => {
  const { data, isSubscribeReady } = useFireBaseDBSubscribe({
    path: googleMeetSettingGetDBMeetingPath(googleMeetSetting.meetingId),
  })

  if (!isSubscribeReady || data == null)
    return {
      isSubscribeReady,
      globalTimerState: null,
    }

  return {
    isSubscribeReady,
    globalTimerState: {
      settingTime: data?.settingTime ?? '',
      startDateTime: data?.startDateTime ?? null,
    },
  }
}
