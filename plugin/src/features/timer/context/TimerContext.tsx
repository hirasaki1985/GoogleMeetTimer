import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  GlobalTimerState,
  initGlobalTimerState,
} from '@/features/timer/type/TimerType';
import { GoogleMeetSetting } from '@/domain/googleMeet/type/GoogleMeetSettingType';
import {
  useFireBaseTimer,
  useUpdateFireBaseTimer,
} from '@/features/timer/hook/useFireBaseTimer';
import dayjs from 'dayjs';

/**
 * state
 */
interface TimerContextState {
  isReady: boolean;
  globalTimerState: GlobalTimerState;
}

const initTimerContextState = (): TimerContextState => ({
  isReady: false,
  globalTimerState: initGlobalTimerState(),
});

/**
 * action
 */
export interface TimerContextAction {
  initialize: () => void;
  updateTimeState: (timerState: GlobalTimerState) => void;
  onChangeStartStopState: (start: boolean) => void;
}
export const initTimerContextAction = (): TimerContextAction => ({
  initialize: () => {},
  updateTimeState: () => {},
  onChangeStartStopState: () => {},
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
  const dbUpdate = useUpdateFireBaseTimer();

  // subscribe data
  const { isSubscribeReady, globalTimerState } =
    useFireBaseTimer(googleMeetSetting);

  /**
   * 初期化を行う
   */
  const initialize = useCallback(async () => {
    try {
      // not ready
      if (!isSubscribeReady) return;

      //
      if (globalTimerState == null) {
        dbUpdate(googleMeetSetting, initGlobalTimerState());
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!isReady) {
        setIsReady(true);
      }
    }
  }, [isSubscribeReady, googleMeetSetting, globalTimerState]);

  /**
   * timeStateの設定を反映する
   */
  const updateTimeState = useCallback(
    (_timerState: GlobalTimerState) => {
      dbUpdate(googleMeetSetting, _timerState);
    },
    [googleMeetSetting, globalTimerState],
  );

  /**
   * タイマーを開始/停止する
   */
  const onChangeStartStopState = useCallback(
    /**
     * @param _start true = 開始する, false = 停止する
     */
    async (_start: boolean) => {
      console.log('TimeContext subscribeData onChangeStartStopState()', _start);
      await dbUpdate(googleMeetSetting, {
        settingTime: globalTimerState?.settingTime ?? '',
        startDateTime: _start ? dayjs().toISOString() : null,
      });
    },
    [googleMeetSetting, globalTimerState],
  );

  console.log('TimeContext subscribeData globalTimerState', globalTimerState);

  /**
   * value
   */
  const value: TimerContextValues = {
    timeState: {
      isReady: isReady && isSubscribeReady,
      globalTimerState: globalTimerState ?? initGlobalTimerState(),
    },
    timeAction: {
      initialize,
      updateTimeState,
      onChangeStartStopState,
    },
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
