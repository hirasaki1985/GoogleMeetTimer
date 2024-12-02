import React from 'react'
import { TestPage } from '@/pages/TestPage'

export const RootRouter = () => {
  // const { authState } = useAuthContext()

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
  // return <GoogleMeetTimerPage />
  return <TestPage />
}
