import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  initLocalTimerState,
  initGlobalTimerState,
  LocalTimerState,
  GlobalTimerState,
} from '@/features/timer/type/TimerType';
import { GoogleMeetSetting } from '@/domain/googleMeet/type/GoogleMeetSettingType';
import { useFireBaseTimer } from '@/features/timer/hook/useFireBaseTimer';
import {
  useFirebaseDBUpdate,
  useFirebaseDBWrite,
} from '@/domain/firebase/hooks/useFireBaseDB';
import { googleMeetSettingGetDBMeetingPath } from '@/domain/googleMeet/helper/GoogleMeetSettingHelper';
import dayjs from 'dayjs';

/**
 * state
 */
interface TimerContextState {
  isReady: boolean;
  globalTimerState: GlobalTimerState | null;
  localTimerState: LocalTimerState;
}

const initTimerContextState = (): TimerContextState => ({
  isReady: false,
  globalTimerState: initGlobalTimerState(),
  localTimerState: initLocalTimerState(),
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
  const [localTimerState, setLocalTimerState] = useState<LocalTimerState>(
    initLocalTimerState(),
  );

  // hooks
  const dbWrite = useFirebaseDBWrite();
  const dbUpdate = useFirebaseDBUpdate();

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
        dbWrite(
          googleMeetSettingGetDBMeetingPath(googleMeetSetting?.meetingId),
          initGlobalTimerState(),
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!isReady) {
        setIsReady(true);
      }
    }
  }, [isSubscribeReady, globalTimerState]);

  /**
   * timeStateの設定を反映する
   */
  const updateTimeState = useCallback(
    (_timerState: GlobalTimerState) => {
      dbUpdate(
        googleMeetSettingGetDBMeetingPath(googleMeetSetting?.meetingId),
        _timerState,
      );
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
    (_start: boolean) => {
      console.log('TimeContext subscribeData onChangeStartStopState()', _start);
      dbUpdate(
        googleMeetSettingGetDBMeetingPath(googleMeetSetting?.meetingId),
        {
          ...globalTimerState,
          startDateTime: _start ? dayjs().toISOString() : null,
        },
      );
    },
    [googleMeetSetting?.meetingId, globalTimerState],
  );

  console.log('TimeContext subscribeData globalTimerState', globalTimerState);
  console.log('TimeContext subscribeData localTimerState', localTimerState);

  /**
   * value
   */
  const value: TimerContextValues = {
    timeState: {
      isReady,
      globalTimerState,
      localTimerState,
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
