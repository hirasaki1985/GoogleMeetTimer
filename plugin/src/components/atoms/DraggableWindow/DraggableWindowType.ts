export const draggableWindowDefaultPosition: DraggableWindowPosition = {
  x: 50,
  y: 50,
}

export interface DraggableWindowPosition {
  x: number
  y: number
}
export const initDraggableWindowPosition = (): DraggableWindowPosition => ({
  x: 0,
  y: 0,
})
