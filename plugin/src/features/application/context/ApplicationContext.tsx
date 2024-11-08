import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { ApplicationSetting, initApplicationSetting } from '../type/ApplicationSettingType'
import { getEnvApplication } from '@/utils/DotEnv'

/**
 * state
 */
interface ApplicationSettingContextState {
  isReady: boolean
  setting: ApplicationSetting
}

const initApplicationSettingContextState = (): ApplicationSettingContextState => ({
  isReady: false,
  setting: initApplicationSetting(),
})

/**
 * action
 */
export interface ApplicationSettingContextAction {
  setUp: () => void
}
export const initApplicationSettingContextAction = (): ApplicationSettingContextAction => ({
  setUp: () => {},
})

/**
 * context
 */
export type ApplicationSettingContextValues = {
  applicationState: ApplicationSettingContextState
  applicationAction: ApplicationSettingContextAction
}
const initApplicationSettingContext = (): ApplicationSettingContextValues => ({
  applicationState: initApplicationSettingContextState(),
  applicationAction: initApplicationSettingContextAction(),
})

export const ApplicationSettingContext = createContext<ApplicationSettingContextValues>(
  initApplicationSettingContext(),
)
export const useApplicationSettingContext = () => useContext(ApplicationSettingContext)

/**
 * provider
 */
export interface ApplicationSettingProviderProps {
  children?: ReactNode
  defaultState?: ApplicationSettingContextState
}

export const ApplicationSettingContextProvider = ({
  children,
  defaultState = initApplicationSettingContextState(),
}: ApplicationSettingProviderProps) => {
  // state
  const [isReady, setIsReady] = useState<boolean>(defaultState?.isReady)
  const [setting, setSetting] = useState<ApplicationSetting>(defaultState?.setting)

  /**
   * 設定をstateに反映する
   */
  const setUp = useCallback(() => {
    setSetting({
      whiteList: getEnvApplication().whiteList.split(','),
    })

    setIsReady(true)
  }, [setting])

  console.log('ApplicationSettingContext state', {
    isReady,
    setting,
  })

  /**
   * value
   */
  const value: ApplicationSettingContextValues = {
    applicationState: {
      isReady,
      setting,
    },
    applicationAction: {
      setUp,
    },
  }

  return (
    <ApplicationSettingContext.Provider value={value}>
      {children}
    </ApplicationSettingContext.Provider>
  )
}
