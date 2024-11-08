import React, { useCallback, useEffect } from 'react'
import { useGoogleMeetSettingContext } from '@/common/googleMeet/context/GoogleMeetSettingContext'
import { TimerContextProvider, useTimerContext } from '@/features/timer/context/TimerContext'
import { GoogleMeetTimePicker } from '@/components/molecules/GoogleMeetTimePicker'

const GoogleMeetTimerPageContent = () => {
  const { timeState, timeAction } = useTimerContext()

  /**
   * 初回ロード
   */
  useEffect(() => {
    timeAction.initialize()
  }, [])

  /**
   * タイマーの時間が変更された時
   */
  const onChangeTimerSetting = useCallback(
    (_time: string) => {
      if (timeState.globalTimerState == null) return

      timeAction.updateTimeState({
        ...timeState.globalTimerState,
        settingTime: _time,
      })
    },
    [timeState.globalTimerState],
  )

  if (!timeState.isReady) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <GoogleMeetTimePicker
        globalTimerState={timeState.globalTimerState}
        localTimerState={timeState.localTimeState}
        onChangeTimerSetting={onChangeTimerSetting}
        onClickStartStopButton={timeAction.onChangeStartStopState}
        onDragStop={timeAction.onDragStopTimer}
        draggableWindowClassName={'z-50'}
      />
    </div>
  )
}

export const GoogleMeetTimerPage = () => {
  const { googleMeetSettingState } = useGoogleMeetSettingContext()

  if (!googleMeetSettingState.isReady) {
    return <div>loading...</div>
  }

  return (
    <TimerContextProvider googleMeetSetting={googleMeetSettingState.setting}>
      <GoogleMeetTimerPageContent />
    </TimerContextProvider>
  )
}
