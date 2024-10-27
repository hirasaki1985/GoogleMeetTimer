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
import {
  useFirebaseDBUpdate,
  useFirebaseDBWrite,
} from '@/domain/firebase/hooks/useFireBaseDB';
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
  const dbUpdate = useFirebaseDBUpdate();

  // subscribe data
  const { isSubscribeReady, timeState } = useFireBaseTimer(googleMeetSetting);

  /**
   * 初期化を行う
   */
  const initialize = useCallback(async () => {
    try {
      // not ready
      if (!isSubscribeReady) return;

      //
      if (timeState == null) {
        dbWrite(
          timerHelperGetDBMeetingPath(googleMeetSetting),
          initTimerState(),
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!isReady) {
        setIsReady(true);
      }
    }
  }, [isSubscribeReady, timeState]);

  /**
   * timeStateの設定を反映する
   */
  const updateTimeState = useCallback(
    (_timerState: TimerState) => {
      dbUpdate(timerHelperGetDBMeetingPath(googleMeetSetting), _timerState);
    },
    [googleMeetSetting, timeState],
  );

  /**
   * タイマーを開始する
   */
  const startTimer = useCallback(() => {
    // setTimerState({ ...timerState, startDateTime: dayjs().toISOString() });
  }, [timeState]);

  /**
   * タイマーを終了する
   */
  const stopTimer = useCallback(() => {
    // setTimerState({ ...timerState, startDateTime: null });
  }, [timeState]);

  console.log('TimeContext subscribeData', isSubscribeReady, timeState);

  /**
   * value
   */
  const value: TimerContextValues = {
    timeState: {
      isReady,
      timerState: timeState,
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
