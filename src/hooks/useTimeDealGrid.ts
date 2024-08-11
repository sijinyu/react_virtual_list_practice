import { useMemo } from 'react';
import { TimeDealResponse } from '@/types';
import { InfiniteData } from '@tanstack/react-query';

export const GRID_CONSTANTS = {
  COLUMN_COUNT: 2,
  GUTTER_SIZE: 8,
  CONTAINER_CUTTER_SIZE: 16,
  ASPECT_RATIO: 1.4,
  MIN_ITEM_HEIGHT: 277,
};

type UseTimeDealGridProps = {
  timeDealPagesData: InfiniteData<TimeDealResponse> | undefined;
  hasNextPage: boolean;
};

export const useTimeDealGrid = ({
  hasNextPage,
  timeDealPagesData,
}: UseTimeDealGridProps) => {
  const items = useMemo(
    () => timeDealPagesData?.pages.flatMap((page) => page.itemList) || [],
    [timeDealPagesData]
  );

  const itemCount = useMemo(() => {
    const count = items.length;
    return hasNextPage
      ? Math.ceil(count / GRID_CONSTANTS.COLUMN_COUNT) *
          GRID_CONSTANTS.COLUMN_COUNT
      : count;
  }, [items.length, hasNextPage]);

  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  return { items, itemCount, isItemLoaded, GRID_CONSTANTS };
};
