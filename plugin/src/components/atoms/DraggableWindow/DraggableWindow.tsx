import React, { ReactNode, useMemo } from 'react';
import Draggable from 'react-draggable';
import './DraggableWindow.css';
import { Icon, IconType } from '@/components/atoms/Icon';

interface DraggableWindowProps {
  containerClassName?: string;
  windowClassName?: string;
  header?: ReactNode;
  children?: ReactNode;
}

/**
 * ドラッグ可能なウィンドウを表示する
 */
export const DraggableWindow = ({
  containerClassName,
  windowClassName,
  header,
  children,
}: DraggableWindowProps) => {
  /**
   * header
   */
  const headerComponent = useMemo(() => {
    return header ? (
      header
    ) : (
      <div className="header">
        <Icon type={IconType.Draggable} className={'cursor-move'} />
      </div>
    );
  }, [header]);

  /**
   * render
   */
  return (
    <Draggable defaultClassName={containerClassName}>
      <div
        className={`draggable-window ${windowClassName ? windowClassName : ''}`}
      >
        {headerComponent}
        {children}
      </div>
    </Draggable>
  );
};
