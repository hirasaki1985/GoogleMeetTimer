import React, { useEffect, useMemo, useState } from 'react'
import {
  GoogleMeetSettingContextProvider,
  useGoogleMeetSettingContext,
} from './common/googleMeet/context/GoogleMeetSettingContext'
import { initializer } from '@/initializer'
import { RootRouter } from '@/router/RootRouter'
import './global.css'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import {
  ApplicationSettingContextProvider,
  useApplicationSettingContext,
} from '@/features/application/context/ApplicationContext'
import { applicationHelperIsMatchWhiteList } from '@/features/application/helper/ApplicationHelper'

export const AppContent = () => {
  const { applicationState, applicationAction } = useApplicationSettingContext()
  const { googleMeetSettingState, googleMeetSettingAction } = useGoogleMeetSettingContext()

  /**
   * 初回実行
   */
  useEffect(() => {
    applicationAction.setUp()
    googleMeetSettingAction.setUp()
  }, [])

  /**
   * タイマーを表示するかどうか
   */
  const isShowTimer = useMemo<boolean>(
    () =>
      applicationHelperIsMatchWhiteList(
        applicationState.setting.whiteList,
        googleMeetSettingState.setting.meetingId,
      ),
    [applicationState.setting.whiteList, googleMeetSettingState.setting.meetingId],
  )

  if (!applicationState.isReady || !googleMeetSettingState.isReady) {
    return <div>loading...</div>
  }

  if (!isShowTimer) {
    return <div />
  }

  return <RootRouter />
}

export const App = () => {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    initializer()
    setIsReady(true)
  }, [])

  if (!isReady) {
    return <div>loading...</div>
  }

  return (
    <ApplicationSettingContextProvider>
      <AuthProvider>
        <GoogleMeetSettingContextProvider>
          <AppContent />
        </GoogleMeetSettingContextProvider>
      </AuthProvider>
    </ApplicationSettingContextProvider>
  )
}
