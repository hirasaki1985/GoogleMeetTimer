import { TimerRepository } from '@/features/timer/repository/TimerRepository'
import { LocalStorageRepository } from '@/dataSources/localStorage/repository/LocalStorageRepository'
import { useCallback } from 'react'
import { LocalTimerState } from '@/features/timer/type/TimerType'

const timerRepository = new TimerRepository(new LocalStorageRepository())

/**
 * LocalTimerStateの取得
 */
export const useLocalTimerStateGet = () => {
  return useCallback((): LocalTimerState => {
    return timerRepository.getLocalTimerState()
  }, [timerRepository])
}

/**
 * LocalTimerStateの更新
 */
export const useLocalTimerStateUpdate = () => {
  return useCallback(
    (state: LocalTimerState) => {
      return timerRepository.updateLocalTimerState(state)
    },
    [timerRepository],
  )
}
