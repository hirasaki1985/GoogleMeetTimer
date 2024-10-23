import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { initTimerState, TimerState } from '@/domain/timer/type/TimerType';
import dayjs from 'dayjs';
import { GoogleMeetSetting } from '@/domain/googleMeet/type/GoogleMeetSettingType';
import { useFireBaseTimer } from '@/domain/timer/hook/useFireBaseTimer';

/**
 * state
 */
interface TimerContextState {
  isReady: boolean;
  timerState: TimerState;
}

const initTimerContextState = (): TimerContextState => ({
  isReady: false,
  timerState: initTimerState(),
});

/**
 * action
 */
export interface TimerContextAction {
  initialize: () => void;
  updateTimeState: (timerState: TimerState) => void;
  startTimer: () => void;
  stopTimer: () => void;
}
export const initTimerContextAction = (): TimerContextAction => ({
  initialize: () => {},
  updateTimeState: () => {},
  startTimer: () => {},
  stopTimer: () => {},
});

/**
 * context
 */
export type TimerContextValues = {
  timeState: TimerContextState;
  timeAction: TimerContextAction;
};
const initTimerContext = (): TimerContextValues => ({
  timeState: initTimerContextState(),
  timeAction: initTimerContextAction(),
});

export const TimerContext =
  createContext<TimerContextValues>(initTimerContext());
export const useTimerContext = () => useContext(TimerContext);

/**
 * provider
 */
export interface TimerProviderProps {
  children?: ReactNode;
  defaultState?: TimerContextState;
  googleMeetSetting: GoogleMeetSetting;
}

export const TimerContextProvider = ({
  children,
  defaultState = initTimerContextState(),
  googleMeetSetting,
}: TimerProviderProps) => {
  // state
  const [isReady, setIsReady] = useState<boolean>(defaultState?.isReady);
  const [timerState, setTimerState] = useState<TimerState>(
    defaultState?.timerState,
  );

  // subscribe data
  const subscribeData = useFireBaseTimer(googleMeetSetting);
  useEffect(() => {
    if (subscribeData == null) return;

    setTimerState(subscribeData);
  }, [subscribeData]);
  console.log('TimeContext subscribeData', subscribeData);

  const initialize = useCallback(() => {
    setIsReady(true);
  }, [googleMeetSetting]);

  /**
   * timeStateの設定を反映する
   */
  const updateTimeState = useCallback(
    (_timerState: TimerState) => {
      setTimerState(_timerState);
    },
    [timerState],
  );

  /**
   * タイマーを開始する
   */
  const startTimer = useCallback(() => {
    setTimerState({ ...timerState, startDateTime: dayjs().toISOString() });
  }, [timerState]);

  /**
   * タイマーを終了する
   */
  const stopTimer = useCallback(() => {
    setTimerState({ ...timerState, startDateTime: null });
  }, [timerState]);

  console.log('TimerContext state', {
    isReady,
    timerState,
  });

  /**
   * value
   */
  const value: TimerContextValues = {
    timeState: {
      isReady,
      timerState,
    },
    timeAction: {
      initialize,
      updateTimeState,
      startTimer,
      stopTimer,
    },
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
