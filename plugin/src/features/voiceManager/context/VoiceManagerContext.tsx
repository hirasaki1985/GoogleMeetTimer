import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { GoogleMeetSetting } from '@/dataSources/googleMeet/type/GoogleMeetSettingType'
import { useFirebaseDBUpdate } from '@/dataSources/base/firebase/hook/useFireBaseDB'
import { useTimerContext } from '@/features/timer/context/TimerContext'
import { useFetchVoicePut } from '@/dataSources/webApi/fetchVoice/useFetchVoice'
import { useGoogleMeetSettingContext } from '@/dataSources/googleMeet/context/GoogleMeetSettingContext'
import { VoiceManagerTextIds } from '@/features/voiceManager/const/VoiceManagerConst'

/**
 * state
 */
interface VoiceManagerContextState {
  isReady: boolean
}

const initVoiceManagerContextState = (): VoiceManagerContextState => ({
  isReady: false,
})

/**
 * action
 */
export interface VoiceManagerContextAction {
  initialize: () => void
  fetchZundamonVoices: () => void
}
export const initVoiceManagerContextAction = (): VoiceManagerContextAction => ({
  initialize: () => {},
  fetchZundamonVoices: () => {},
})

/**
 * context
 */
export type VoiceManagerContextValues = {
  voiceManagerState: VoiceManagerContextState
  voiceManagerAction: VoiceManagerContextAction
}
const initVoiceManagerContext = (): VoiceManagerContextValues => ({
  voiceManagerState: initVoiceManagerContextState(),
  voiceManagerAction: initVoiceManagerContextAction(),
})

export const VoiceManagerContext =
  createContext<VoiceManagerContextValues>(initVoiceManagerContext())
export const useVoiceManagerContext = () => useContext(VoiceManagerContext)

/**
 * provider
 */
export interface VoiceManagerProviderProps {
  children?: ReactNode
  defaultState?: VoiceManagerContextState
}

export const VoiceManagerContextProvider = ({
  children,
  defaultState = initVoiceManagerContextState(),
}: VoiceManagerProviderProps) => {
  // context
  const { timeState } = useTimerContext()
  const { googleMeetSettingState } = useGoogleMeetSettingContext()

  // state
  const [isReady, setIsReady] = useState<boolean>(defaultState?.isReady)

  // hooks
  const fetchVoicePut = useFetchVoicePut()

  /**
   * 初期化を行う
   */
  const initialize = useCallback(async () => {
    try {
      // not ready
      if (!timeState.isReady) return
    } catch (e) {
      console.error(e)
    } finally {
      if (!isReady) {
        setIsReady(true)
      }
    }
  }, [timeState.isReady])

  /**
   * ずんだもんの音声のURLを最新の状態にする
   */
  const fetchZundamonVoices = useCallback(async () => {
    console.log('VoiceManagerContext fetchZundamonVoices()', timeState)
    await fetchVoicePut({
      meetingId: googleMeetSettingState.setting.meetingId,
      textId: VoiceManagerTextIds.Start,
    })
  }, [timeState.isReady, googleMeetSettingState.setting.meetingId])

  /**
   * value
   */
  const value: VoiceManagerContextValues = {
    voiceManagerState: {
      isReady: isReady && timeState.isReady,
    },
    voiceManagerAction: {
      initialize,
      fetchZundamonVoices,
    },
  }

  return <VoiceManagerContext.Provider value={value}>{children}</VoiceManagerContext.Provider>
}
