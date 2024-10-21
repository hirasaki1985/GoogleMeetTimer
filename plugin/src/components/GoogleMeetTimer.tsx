import React from 'react';
import { useGoogleMeetSettingContext } from '@/domain/googleMeet/context/GoogleMeetSettingContext';
import { useFireBaseDB } from '@/domain/firebase/hooks/useFireBaseDB';

export const GoogleMeetTimer = () => {
  const { state } = useGoogleMeetSettingContext();
  const { data } = useFireBaseDB({ path: state.meetingId });
  return (
    <div>
      <p>GoogleMeetTimer. meetingId is{state.meetingId} </p>
      <p>{data}</p>
    </div>
  );
};
