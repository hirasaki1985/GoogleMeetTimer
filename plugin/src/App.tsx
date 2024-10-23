import React, { useEffect, useState } from 'react';
import {
  GoogleMeetSettingContextProvider,
  useGoogleMeetSettingContext,
} from './domain/googleMeet/context/GoogleMeetSettingContext';
import { initializer } from '@/initializer';
import { GoogleMeetTimerPage } from '@/pages/GoogleMeetTimerPage';

export const AppContent = () => {
  const { state, action } = useGoogleMeetSettingContext();

  /**
   * 初回実行
   */
  useEffect(() => {
    action.setUp();
  }, []);

  if (!state.isReady) {
    return <div>loading...</div>;
  }

  return <GoogleMeetTimerPage />;
};

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    initializer();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div>loading...</div>;
  }

  return (
    <GoogleMeetSettingContextProvider>
      <AppContent />
    </GoogleMeetSettingContextProvider>
  );
};
