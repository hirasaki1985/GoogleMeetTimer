import { DraggableWindow } from '@/components/atoms/DraggableWindow';
import { TimePicker } from '@/components/atoms/TimePicker';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/atoms/Button';
import { GlobalTimerState } from '@/features/timer/type/TimerType';
import {
  timeHelperGetRestTime,
  timerHelperIsStart,
} from '@/features/timer/helper/TimerHelper';
import { Spinner } from '@/components/atoms/Spinner';

/**
 * props
 */
export interface GoogleMeetTimePickerProps {
  globalTimerState: GlobalTimerState | null;
  onChangeTimerSetting: (time: string) => void;
  onClickStartStopButton: (start: boolean) => void;
  containerClassName?: string;
}

/**
 * GoogleMeet上に表示するタイマー
 */
export const GoogleMeetTimePicker = ({
  globalTimerState,
  onChangeTimerSetting,
  onClickStartStopButton,
  containerClassName,
}: GoogleMeetTimePickerProps) => {
  // local state
  const [timerCurrentTime, setTimerCurrentTime] = useState<string>('');

  // timer
  const intervalRef = useRef<number | null>(null); // インターバルIDを保持

  const isStart = useMemo<boolean>(
    () => timerHelperIsStart(globalTimerState),
    [globalTimerState?.startDateTime],
  );

  /**
   * タイマー管理
   */
  useEffect(() => {
    // 停止する場合
    if (!isStart) {
      resetTimer();
      return;
    }

    // 1秒ごとにカウントを減らすインターバルを開始
    intervalRef.current = setInterval(() => {
      const _displayTime = timeHelperGetRestTime(globalTimerState);
      setTimerCurrentTime(_displayTime);
    }, 1000);

    // コンポーネントのアンマウント時にインターバルをクリア
    return () => {
      resetTimer();
    };
  }, [isStart]);

  // カウントが0以下になったらインターバルをクリア
  useEffect(() => {
    if (timerCurrentTime === '00:00') {
      resetTimer();
    }
  }, [timerCurrentTime]);

  /**
   * タイマーをリセットする
   */
  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimerCurrentTime('');
  }, [intervalRef]);

  /**
   * 表示する時間を決める
   */
  const viewTime = useMemo(
    () =>
      isStart
        ? (timerCurrentTime ?? globalTimerState?.settingTime)
        : (globalTimerState?.settingTime ?? ''),
    [timerCurrentTime, globalTimerState?.settingTime],
  );

  return (
    <div className={containerClassName}>
      <DraggableWindow>
        {viewTime != null && viewTime !== '' ? (
          <div className={'flex justify-center items-center gap-2'}>
            <div>
              <TimePicker value={viewTime} onChange={onChangeTimerSetting} />
            </div>
            <div>
              <Button
                label={isStart ? '停止' : '開始'}
                onClick={() => {
                  onClickStartStopButton(!isStart);
                }}
              />
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </DraggableWindow>
    </div>
  );
};
