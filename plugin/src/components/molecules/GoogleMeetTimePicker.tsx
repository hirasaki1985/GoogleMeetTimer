import { DraggableWindow, DraggableWindowPosition } from '@/components/atoms/DraggableWindow'
import { TimePicker } from '@/components/atoms/TimePicker'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { GlobalTimerState, LocalTimerState } from '@/features/timer/type/TimerType'
import { timeHelperGetRestTime, timerHelperIsStart } from '@/features/timer/helper/TimerHelper'
import { Spinner } from '@/components/atoms/Spinner'

/**
 * props
 */
export interface GoogleMeetTimePickerProps {
  globalTimerState: GlobalTimerState | null
  localTimerState: LocalTimerState
  onChangeTimerSetting: (time: string) => void
  onClickStartStopButton: (start: boolean) => void
  onDragStop: (position: DraggableWindowPosition) => void
  containerClassName?: string
  draggableWindowClassName?: string
}

/**
 * GoogleMeet上に表示するタイマー
 */
export const GoogleMeetTimePicker = ({
  globalTimerState,
  localTimerState,
  onChangeTimerSetting,
  onClickStartStopButton,
  onDragStop,
  containerClassName,
  draggableWindowClassName,
}: GoogleMeetTimePickerProps) => {
  // current time
  const [currentTime, setCurrentTime] = useState<string>('')
  useEffect(() => {
    setCurrentTime(globalTimerState?.settingTime ?? '')
  }, [globalTimerState?.settingTime])

  // timer
  const intervalRef = useRef<number | null>(null) // インターバルIDを保持

  /**
   * 開始中かどうか
   */
  const isStart = useMemo<boolean>(
    () => timerHelperIsStart(globalTimerState),
    [globalTimerState?.startDateTime],
  )

  /**
   * タイマーをリセットする
   */
  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [intervalRef])

  /**
   * タイマー管理
   */
  useEffect(() => {
    // 停止する場合
    if (!isStart) {
      resetTimer()
      return
    }

    // 1秒ごとにカウントを減らすインターバルを開始
    intervalRef.current = setInterval(() => {
      const _displayTime = timeHelperGetRestTime(globalTimerState)
      setCurrentTime(_displayTime)
    }, 1000)

    // コンポーネントのアンマウント時にインターバルをクリア
    return () => {
      resetTimer()
    }
  }, [isStart])

  // カウントが0以下になったらインターバルをクリア
  useEffect(() => {
    if (currentTime === '00:00') {
      resetTimer()
    }
  }, [currentTime])

  /**
   * 表示する時間を決める
   */
  const viewTime = useMemo(
    () =>
      isStart
        ? (currentTime ?? globalTimerState?.settingTime)
        : (globalTimerState?.settingTime ?? ''),
    [isStart, currentTime, globalTimerState?.settingTime],
  )

  return (
    <div className={containerClassName}>
      <DraggableWindow
        windowClassName={draggableWindowClassName}
        position={localTimerState.position}
        onDragStop={onDragStop}
      >
        {viewTime != null && viewTime !== '' ? (
          <div className={'flex justify-center items-center gap-2'}>
            <div>
              <TimePicker value={viewTime} onChange={onChangeTimerSetting} readonly={isStart} />
            </div>
            <div>
              <Button
                label={isStart ? '停止' : '開始'}
                onClick={() => {
                  onClickStartStopButton(!isStart)
                }}
              />
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </DraggableWindow>
    </div>
  )
}
