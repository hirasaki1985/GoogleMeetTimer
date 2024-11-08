import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import './DraggableWindow.css'
import { Icon, IconType } from '@/components/atoms/Icon'
import {
  DraggableWindowPosition,
  initDraggableWindowPosition,
} from '@/components/atoms/DraggableWindow/DraggableWindowType'

interface DraggableWindowProps {
  position?: DraggableWindowPosition
  onDragStop?: (position: DraggableWindowPosition) => void
  containerClassName?: string
  windowClassName?: string
  header?: ReactNode
  children?: ReactNode
}

/**
 * ドラッグ可能なウィンドウを表示する
 */
export const DraggableWindow = ({
  position,
  onDragStop,
  containerClassName,
  windowClassName,
  header,
  children,
}: DraggableWindowProps) => {
  // position
  const [currentPosition, setCurrentPosition] = useState<DraggableWindowPosition>(
    initDraggableWindowPosition(),
  )
  useEffect(() => {
    if (position == null) return
    setCurrentPosition(position)
  }, [position])

  /**
   * ドラッグされた時
   */
  const handleDragStop = useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      const _position: DraggableWindowPosition = { x: data.x, y: data.y }
      setCurrentPosition(_position)
      if (onDragStop) {
        onDragStop(_position)
      }
    },
    [position],
  )

  /**
   * header
   */
  const headerComponent = useMemo(() => {
    return header ? (
      header
    ) : (
      <div className='header'>
        <Icon type={IconType.Draggable} className={'cursor-move'} />
      </div>
    )
  }, [header])

  /**
   * render
   */
  return (
    <Draggable
      defaultClassName={containerClassName}
      onStop={handleDragStop}
      position={currentPosition}
    >
      <div className={`draggable-window ${windowClassName ? windowClassName : ''}`}>
        {headerComponent}
        {children}
      </div>
    </Draggable>
  )
}
