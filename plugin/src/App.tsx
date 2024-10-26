import React, { useEffect, useState } from 'react';
import {
  GoogleMeetSettingContextProvider,
  useGoogleMeetSettingContext,
} from './domain/googleMeet/context/GoogleMeetSettingContext';
import { initializer } from '@/initializer';
import { RootRouter } from '@/router/RootRouter';
import './global.css';
import { AuthProvider } from '@/features/auth/context/AuthContext';

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

  return <RootRouter />;
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
    <AuthProvider>
      <GoogleMeetSettingContextProvider>
        <AppContent />
      </GoogleMeetSettingContextProvider>
    </AuthProvider>
  );
};
