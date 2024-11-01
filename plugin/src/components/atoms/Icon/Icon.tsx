import React, { ReactNode, useMemo } from 'react';
import { IconProps, IconType } from '@/components/atoms/Icon/type';
import { DraggableIcon } from '@/components/atoms/Icon/images';

/**
 * アイコン
 */
export const Icon = ({ type, onClick, className }: IconProps) => {
  const viewIcon = useMemo((): ReactNode => {
    switch (type) {
      case IconType.Draggable:
        return <DraggableIcon />;
    }
  }, [type]);

  const containerClassName = useMemo(() => {
    return `flex justify-center items-center content-center ${onClick ? 'cursor-pointer' : 'cursor-default'} ${className ? className : ''}`;
  }, [onClick, className]);

  return (
    <div
      className={containerClassName}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {viewIcon}
    </div>
  );
};
