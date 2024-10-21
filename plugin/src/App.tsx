import React, { useEffect } from 'react';
import {
  GoogleMeetSettingContextProvider,
  useGoogleMeetSettingContext,
} from './domain/googleMeet/context/GoogleMeetSettingContext';
import { GoogleMeetTimer } from './components/GoogleMeetTimer';

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

  return <GoogleMeetTimer />;
};

export const App = () => {
  return (
    <GoogleMeetSettingContextProvider>
      <AppContent />
    </GoogleMeetSettingContextProvider>
  );
};
