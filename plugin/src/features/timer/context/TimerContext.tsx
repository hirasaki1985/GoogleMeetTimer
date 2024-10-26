import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { initTimerState, TimerState } from '@/features/timer/type/TimerType';
import { GoogleMeetSetting } from '@/domain/googleMeet/type/GoogleMeetSettingType';
import { useFireBaseTimer } from '@/features/timer/hook/useFireBaseTimer';
import { useFirebaseDBWrite } from '@/domain/firebase/hooks/useFireBaseDB';
import { timerHelperGetDBMeetingPath } from '@/features/timer/helper/TimerHelper';

/**
 * state
 */
interface TimerContextState {
  isReady: boolean;
  timerState: TimerState | null;
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

  // hooks
  const dbWrite = useFirebaseDBWrite();

  // subscribe data
  const subscribeData = useFireBaseTimer(googleMeetSetting);
  // useEffect(() => {
  //   if (subscribeData == null) return;
  //
  //   setTimerState(subscribeData);
  // }, [subscribeData]);
  console.log('TimeContext subscribeData', subscribeData);

  const initialize = useCallback(async () => {
    if (subscribeData == null) {
      dbWrite(timerHelperGetDBMeetingPath(googleMeetSetting), initTimerState());
    }
    if (!isReady) {
      setIsReady(true);
    }
  }, [subscribeData, googleMeetSetting]);

  /**
   * timeStateの設定を反映する
   */
  const updateTimeState = useCallback(
    (_timerState: TimerState) => {
      // setTimerState(_timerState);
    },
    [subscribeData],
  );

  /**
   * タイマーを開始する
   */
  const startTimer = useCallback(() => {
    // setTimerState({ ...timerState, startDateTime: dayjs().toISOString() });
  }, [subscribeData]);

  /**
   * タイマーを終了する
   */
  const stopTimer = useCallback(() => {
    // setTimerState({ ...timerState, startDateTime: null });
  }, [subscribeData]);

  console.log('TimerContext state', {
    isReady,
    subscribeData,
  });

  /**
   * value
   */
  const value: TimerContextValues = {
    timeState: {
      isReady,
      timerState: subscribeData,
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
