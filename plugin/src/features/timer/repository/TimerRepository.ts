import { LocalStorageRepository } from '@/common/localStorage/repository/LocalStorageRepository'
import { initLocalTimerState, LocalTimerState } from '@/features/timer/type/TimerType'
import { localStorageGetLocalTimerStateKey } from '@/common/localStorage/helper/LocalStorageHelper'
import { draggableWindowDefaultPosition } from '@/components/atoms/DraggableWindow'

export class TimerRepository {
  private localStorage: LocalStorageRepository

  constructor(localStorage: LocalStorageRepository) {
    this.localStorage = localStorage
  }

  /**
   * LocalTimerStateを取得する
   */
  public getLocalTimerState(): LocalTimerState {
    try {
      const data = this.localStorage.get(localStorageGetLocalTimerStateKey())
      if (data == null) return initLocalTimerState()

      const json = JSON.parse(data)
      return {
        position: {
          x: json.position?.x ?? draggableWindowDefaultPosition.x,
          y: json.position?.y ?? draggableWindowDefaultPosition.y,
        },
      }
    } catch (e) {
      console.error(e)
    }

    return initLocalTimerState()
  }

  /**
   * LocalTimerStateを更新する
   */
  public updateLocalTimerState(state: LocalTimerState) {
    try {
      return this.localStorage.set(localStorageGetLocalTimerStateKey(), state)
    } catch (e) {
      console.error(e)
    }
  }
}
