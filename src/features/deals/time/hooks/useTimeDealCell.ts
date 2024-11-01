import { useCallback, useMemo } from 'react';
import { isTimeDealOpen } from '@/utils';
import { GRID_CONSTANTS } from './useTimeDealGrid';
import { TCellData, TTimeDealItem } from '@/core/types';

export const useTimeDealCell = (
  items: TTimeDealItem[],
  isItemLoaded: (index: number) => boolean
) => {
  const isOpen = useMemo(() => isTimeDealOpen(new Date().getHours()), []);

  return useCallback(
    (
      columnIndex: number,
      rowIndex: number,
      style: React.CSSProperties
    ): TCellData => {
      const itemIndex = rowIndex * GRID_CONSTANTS.COLUMN_COUNT + columnIndex;

      if (!isItemLoaded(itemIndex)) {
        return { isLoading: true, style };
      }

      const item = items[itemIndex];
      if (!item) return null;

      const cellStyle = {
        ...style,
        left:
          columnIndex === 0
            ? Number(style.left) + GRID_CONSTANTS.CONTAINER_CUTTER_SIZE
            : Number(style.left) + GRID_CONSTANTS.GUTTER_SIZE / 2,
        top: Number(style.top) + GRID_CONSTANTS.GUTTER_SIZE,
        width:
          Number(style.width) -
          GRID_CONSTANTS.CONTAINER_CUTTER_SIZE -
          GRID_CONSTANTS.GUTTER_SIZE / 2,
        height: Number(style.height) - GRID_CONSTANTS.GUTTER_SIZE,
      };

      return { item, isOpen, style: cellStyle, isLoading: false };
    },
    [isItemLoaded, items, isOpen]
  );
};
