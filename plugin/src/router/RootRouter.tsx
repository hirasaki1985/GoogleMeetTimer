import React, { useMemo } from 'react';

import { GoogleMeetTimerPage } from '@/pages/GoogleMeetTimerPage';
import { LoginPage } from '@/pages/LoginPage';
import { useAuthContext } from '@/features/auth/context/AuthContext';

export const RootRouter = () => {
  const { authState } = useAuthContext();

  /*
  const viewPage = useMemo(() => {
    if (authState.user) {
      return <GoogleMeetTimerPage />;
    }

    return <LoginPage />;
  }, [authState.user]);

  if (!authState.isReady) {
    return <div>loading</div>;
  }*/

  // return <>{viewPage}</>;
  return <GoogleMeetTimerPage />;
};
