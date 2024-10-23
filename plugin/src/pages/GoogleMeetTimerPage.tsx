import React, { useEffect } from 'react';
import { useGoogleMeetSettingContext } from '@/domain/googleMeet/context/GoogleMeetSettingContext';
import {
  TimerContextProvider,
  useTimerContext,
} from '@/domain/timer/context/TimerContext';

const GoogleMeetTimerPageContent = () => {
  const { state } = useGoogleMeetSettingContext();
  const { timeState, timeAction } = useTimerContext();

  console.log('GoogleMeetTimerPageContent state', state);
  console.log('GoogleMeetTimerPageContent timeState', timeState);

  useEffect(() => {
    timeAction.initialize();
  }, []);

  if (!timeState.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>GoogleMeetTimer. meetingId is{state.setting.meetingId} </p>
    </div>
  );
};

export const GoogleMeetTimerPage = () => {
  const { state } = useGoogleMeetSettingContext();

  if (!state.isReady) {
    return <div>loading...</div>;
  }

  return (
    <TimerContextProvider googleMeetSetting={state.setting}>
      <GoogleMeetTimerPageContent />
    </TimerContextProvider>
  );
};
