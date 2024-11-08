import React, { useEffect, useState } from 'react'
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

  if (!applicationState.isReady || !googleMeetSettingState.isReady) {
    return <div>loading...</div>
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
