import {
  draggableWindowDefaultPosition,
  DraggableWindowPosition,
} from '@/components/atoms/DraggableWindow'

/**
 * 参加者個別の状態
 */
export interface LocalTimerState {
  position: DraggableWindowPosition
}
export const initLocalTimerState = (): LocalTimerState => ({
  position: draggableWindowDefaultPosition,
})
