import React, { useCallback, useEffect } from 'react';
import { useGoogleMeetSettingContext } from '@/domain/googleMeet/context/GoogleMeetSettingContext';
import {
  TimerContextProvider,
  useTimerContext,
} from '@/features/timer/context/TimerContext';
import { TimePicker } from '@/components/TimePicker';

const GoogleMeetTimerPageContent = () => {
  const { state } = useGoogleMeetSettingContext();
  const { timeState, timeAction } = useTimerContext();

  console.log('GoogleMeetTimerPageContent state', state);
  console.log('GoogleMeetTimerPageContent timeState', timeState);

  /**
   * 初回ロード
   */
  useEffect(() => {
    timeAction.initialize();
  }, []);

  /**
   * タイマーの時間が変更された時
   */
  const onChangeTimerSetting = useCallback(
    (_time: string) => {
      if (timeState.timerState == null) return;

      timeAction.updateTimeState({
        ...timeState.timerState,
        settingTime: _time,
      });
    },
    [timeState.timerState],
  );

  if (!timeState.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TimePicker onChange={onChangeTimerSetting} />
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
