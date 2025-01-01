import React, { useCallback, useEffect } from 'react'
import { useGoogleMeetSettingContext } from '@/dataSources/googleMeet/context/GoogleMeetSettingContext'
import { TimerContextProvider, useTimerContext } from '@/features/timer/context/TimerContext'
import { GoogleMeetTimePicker } from '@/components/molecules/GoogleMeetTimePicker'
import {
  useVoiceManagerContext,
  VoiceManagerContextProvider,
} from '@/features/voiceManager/context/VoiceManagerContext'

const GoogleMeetTimerPageContent = () => {
  const { timeState, timeAction } = useTimerContext()
  const { voiceManagerState, voiceManagerAction } = useVoiceManagerContext()

  /**
   * 初回ロード
   */
  useEffect(() => {
    timeAction.initialize()
  }, [])

  /**
   * 音声データの初期化
   */
  useEffect(() => {
    if (timeState.isReady) {
      voiceManagerAction.fetchZundamonVoices()
    }
  }, [timeState.isReady])

  console.log('GoogleMeetTimerPageContent voiceManagerState', voiceManagerState)

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
      <VoiceManagerContextProvider>
        <GoogleMeetTimerPageContent />
      </VoiceManagerContextProvider>
    </TimerContextProvider>
  )
}
