import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import {
  GlobalTimerState,
  initGlobalTimerState,
  initLocalTimerState,
  LocalTimerState,
} from '@/features/timer/type/TimerType'
import { GoogleMeetSetting } from '@/dataSources/googleMeet/type/GoogleMeetSettingType'
import { useFireBaseTimer, useUpdateFireBaseTimer } from '@/features/timer/hook/useFireBaseTimer'
import dayjs from 'dayjs'
import {
  useLocalTimerStateGet,
  useLocalTimerStateUpdate,
} from '@/features/timer/hook/useLocalTimerState'
import { DraggableWindowPosition } from '@/components/atoms/DraggableWindow'

/**
 * state
 */
interface TimerContextState {
  isReady: boolean
  globalTimerState: GlobalTimerState
  localTimeState: LocalTimerState
}

const initTimerContextState = (): TimerContextState => ({
  isReady: false,
  globalTimerState: initGlobalTimerState(),
  localTimeState: initLocalTimerState(),
})

/**
 * action
 */
export interface TimerContextAction {
  initialize: () => void
  updateTimeState: (timerState: GlobalTimerState) => void
  onChangeStartStopState: (start: boolean) => void
  onDragStopTimer: (position: DraggableWindowPosition) => void
}
export const initTimerContextAction = (): TimerContextAction => ({
  initialize: () => {},
  updateTimeState: () => {},
  onChangeStartStopState: () => {},
  onDragStopTimer: () => {},
})

/**
 * context
 */
export type TimerContextValues = {
  timeState: TimerContextState
  timeAction: TimerContextAction
}
const initTimerContext = (): TimerContextValues => ({
  timeState: initTimerContextState(),
  timeAction: initTimerContextAction(),
})

export const TimerContext = createContext<TimerContextValues>(initTimerContext())
export const useTimerContext = () => useContext(TimerContext)

/**
 * provider
 */
export interface TimerProviderProps {
  children?: ReactNode
  defaultState?: TimerContextState
  googleMeetSetting: GoogleMeetSetting
}

export const TimerContextProvider = ({
  children,
  defaultState = initTimerContextState(),
  googleMeetSetting,
}: TimerProviderProps) => {
  // state
  const [isReady, setIsReady] = useState<boolean>(defaultState?.isReady)

  // hooks
  const dbUpdate = useUpdateFireBaseTimer()
  const localTimerStateGet = useLocalTimerStateGet()
  const localTimerStateUpdate = useLocalTimerStateUpdate()

  // subscribe data
  const { isSubscribeReady, globalTimerState } = useFireBaseTimer(googleMeetSetting)

  // local time state
  const [localTimeState, setLocalTimeState] = useState<LocalTimerState | undefined>(
    defaultState?.localTimeState,
  )

  /**
   * 初期化を行う
   */
  const initialize = useCallback(async () => {
    // local stateの更新
    setLocalTimeState(localTimerStateGet())

    try {
      // not ready
      if (!isSubscribeReady) return

      // global stateの更新
      if (globalTimerState == null) {
        dbUpdate(googleMeetSetting, initGlobalTimerState())
      }
    } catch (e) {
      console.error(e)
    } finally {
      if (!isReady) {
        setIsReady(true)
      }
    }
  }, [isSubscribeReady, googleMeetSetting, globalTimerState])

  /**
   * timeStateの設定を反映する
   */
  const updateTimeState = useCallback(
    (_timerState: GlobalTimerState) => {
      dbUpdate(googleMeetSetting, _timerState)
    },
    [googleMeetSetting, globalTimerState],
  )

  /**
   * タイマーを開始/停止する
   */
  const onChangeStartStopState = useCallback(
    /**
     * @param _start true = 開始する, false = 停止する
     */
    async (_start: boolean) => {
      console.log('TimeContext subscribeData onChangeStartStopState()', _start)
      await dbUpdate(googleMeetSetting, {
        settingTime: globalTimerState?.settingTime ?? '',
        startDateTime: _start ? dayjs().toISOString() : null,
      })
    },
    [googleMeetSetting, globalTimerState],
  )

  /**
   * localTimeState: タイマーがドラッグされた時
   */
  const onDragStopTimer = useCallback(
    (position: DraggableWindowPosition) => {
      console.log('TimeContext onDragStopTimer() position', position)
      localTimerStateUpdate({
        position,
      })
    },
    [localTimeState],
  )

  console.log('TimeContext globalTimerState', globalTimerState)
  console.log('TimeContext localTimeState', localTimeState)

  /**
   * value
   */
  const value: TimerContextValues = {
    timeState: {
      isReady: isReady && isSubscribeReady,
      globalTimerState: globalTimerState ?? initGlobalTimerState(),
      localTimeState: localTimeState ?? initLocalTimerState(),
    },
    timeAction: {
      initialize,
      updateTimeState,
      onChangeStartStopState,
      onDragStopTimer,
    },
  }

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}
