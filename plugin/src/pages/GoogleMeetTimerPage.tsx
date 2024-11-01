import React, { useCallback, useEffect } from 'react';
import { useGoogleMeetSettingContext } from '@/domain/googleMeet/context/GoogleMeetSettingContext';
import {
  TimerContextProvider,
  useTimerContext,
} from '@/features/timer/context/TimerContext';
import { GoogleMeetTimePicker } from '@/components/molecules/GoogleMeetTimePicker';

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
      if (timeState.globalTimerState == null) return;

      timeAction.updateTimeState({
        ...timeState.globalTimerState,
        settingTime: _time,
      });
    },
    [timeState.globalTimerState],
  );

  if (!timeState.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <GoogleMeetTimePicker
        onChangeTimerSetting={onChangeTimerSetting}
        globalTimerState={timeState.globalTimerState}
        localTimerState={timeState.localTimerState}
        onClickStartStopButton={timeAction.onChangeStartStopState}
      />
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
