import { DraggableWindow } from '@/components/atoms/DraggableWindow';
import { TimePicker } from '@/components/atoms/TimePicker';
import React, { useMemo } from 'react';
import { Button } from '@/components/atoms/Button';
import {
  LocalTimerState,
  GlobalTimerState,
} from '@/features/timer/type/TimerType';
import { timerHelperIsStart } from '@/features/timer/helper/TimerHelper';

/**
 * props
 */
export interface GoogleMeetTimePickerProps {
  globalTimerState: GlobalTimerState | null;
  localTimerState: LocalTimerState;
  onChangeTimerSetting: (time: string) => void;
  onClickStartStopButton: (start: boolean) => void;
  containerClassName?: string;
}

/**
 * GoogleMeet上に表示するタイマー
 */
export const GoogleMeetTimePicker = ({
  globalTimerState,
  localTimerState,
  onChangeTimerSetting,
  onClickStartStopButton,
  containerClassName,
}: GoogleMeetTimePickerProps) => {
  const isStart = useMemo<boolean>(
    () => timerHelperIsStart(globalTimerState),
    [globalTimerState?.startDateTime],
  );

  return (
    <div className={containerClassName}>
      <DraggableWindow>
        <div className={'flex justify-center items-center gap-2'}>
          <div>
            <TimePicker
              value={globalTimerState?.settingTime}
              onChange={onChangeTimerSetting}
            />
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
      </DraggableWindow>
    </div>
  );
};
