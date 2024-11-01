import dayjs from 'dayjs';
import { timeHelperGetRestTime } from '@/features/timer/helper/TimerHelper';
import { GlobalTimerState } from '@/features/timer/type/TimerType';

const now = '2024-11-01T02:00:00.000Z';

describe('timeHelperGetRestTime', () => {
  it("globalTimerStateがnullの場合は'00:00'を返すべき", () => {
    expect(timeHelperGetRestTime(null)).toBe('00:00');
  });

  it("settingTimeが提供されていない場合は'00:00'を返すべき", () => {
    const state: GlobalTimerState = {
      settingTime: '',
      startDateTime: null,
    };
    expect(timeHelperGetRestTime(state)).toBe('00:00');
  });

  it('タイマーが停止中の場合、settingTimeを返すべき', () => {
    const state: GlobalTimerState = {
      settingTime: '03:00',
      startDateTime: null,
    };
    expect(timeHelperGetRestTime(state)).toBe('03:00');
  });

  it('タイマーがまだ動いている場合に残り時間を正しく返すべき:  20秒経過', () => {
    const state: GlobalTimerState = {
      settingTime: '03:00',
      startDateTime: dayjs(now).subtract(20, 'second').toISOString(),
    };
    expect(timeHelperGetRestTime(state, now)).toBe('02:40');
  });

  it('残り時間のフォーマットが正しいことを確認するべき: 1分経過', () => {
    const state: GlobalTimerState = {
      settingTime: '03:00',
      startDateTime: dayjs(now).subtract(60, 'second').toISOString(),
    };
    expect(timeHelperGetRestTime(state, now)).toBe('02:00');
  });

  it('残り時間のフォーマットが正しいことを確認するべき: 残り1秒', () => {
    const state: GlobalTimerState = {
      settingTime: '03:00',
      startDateTime: dayjs(now).subtract(179, 'second').toISOString(),
    };
    expect(timeHelperGetRestTime(state, now)).toBe('00:01');
  });

  it("時間が経過した場合は'00:00'を返すべき", () => {
    const state: GlobalTimerState = {
      settingTime: '03:00',
      startDateTime: dayjs(now).subtract(180, 'second').toISOString(),
    };
    expect(timeHelperGetRestTime(state)).toBe('00:00');
  });

  it("時間が経過した場合は'00:00'を返すべき2", () => {
    const state: GlobalTimerState = {
      settingTime: '03:00',
      startDateTime: dayjs(now).subtract(300, 'second').toISOString(),
    };
    expect(timeHelperGetRestTime(state)).toBe('00:00');
  });
});
