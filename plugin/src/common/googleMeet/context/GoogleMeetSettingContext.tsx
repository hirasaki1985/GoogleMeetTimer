import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import {
  GoogleMeetSetting,
  initGoogleMeetSetting,
} from '@/common/googleMeet/type/GoogleMeetSettingType'

/**
 * state
 */
interface GoogleMeetSettingContextState {
  isReady: boolean
  setting: GoogleMeetSetting
}

const initGoogleMeetSettingContextState = (): GoogleMeetSettingContextState => ({
  isReady: false,
  setting: initGoogleMeetSetting(),
})

/**
 * action
 */
export interface GoogleMeetSettingContextAction {
  setUp: () => void
}
export const initGoogleMeetSettingContextAction = (): GoogleMeetSettingContextAction => ({
  setUp: () => {},
})

/**
 * context
 */
export type GoogleMeetSettingContextValues = {
  googleMeetSettingState: GoogleMeetSettingContextState
  googleMeetSettingAction: GoogleMeetSettingContextAction
}
const initGoogleMeetSettingContext = (): GoogleMeetSettingContextValues => ({
  googleMeetSettingState: initGoogleMeetSettingContextState(),
  googleMeetSettingAction: initGoogleMeetSettingContextAction(),
})

export const GoogleMeetSettingContext = createContext<GoogleMeetSettingContextValues>(
  initGoogleMeetSettingContext(),
)
export const useGoogleMeetSettingContext = () => useContext(GoogleMeetSettingContext)

/**
 * provider
 */
export interface GoogleMeetSettingProviderProps {
  children?: ReactNode
  defaultState?: GoogleMeetSettingContextState
}

export const GoogleMeetSettingContextProvider = ({
  children,
  defaultState = initGoogleMeetSettingContextState(),
}: GoogleMeetSettingProviderProps) => {
  // state
  const [isReady, setIsReady] = useState<boolean>(defaultState?.isReady)
  const [setting, setSetting] = useState<GoogleMeetSetting>(defaultState?.setting)

  /**
   * 設定をstateに反映する
   */
  const setUp = useCallback(() => {
    const _currentUrl = window.location.href

    console.log('GoogleMeetSettingContext _currentUrl', _currentUrl)
    if (_currentUrl == null || _currentUrl === '') return

    const _match = _currentUrl.match(/\/([a-z]{3}-[a-z]{4}-[a-z]{3})/)

    // const path = url.pathname.split('/')[1];
    if (_match) {
      const _meetingId = _match[1]
      setSetting({
        ...setting,
        meetingId: _meetingId,
      })
    } else {
      console.log('Meeting ID not found')
    }
    setIsReady(true)
  }, [setting])

  console.log('GoogleMeetSettingContext state', {
    isReady,
    setting,
  })

  /**
   * value
   */
  const value: GoogleMeetSettingContextValues = {
    googleMeetSettingState: {
      isReady,
      setting,
    },
    googleMeetSettingAction: {
      setUp,
    },
  }

  return (
    <GoogleMeetSettingContext.Provider value={value}>{children}</GoogleMeetSettingContext.Provider>
  )
}
