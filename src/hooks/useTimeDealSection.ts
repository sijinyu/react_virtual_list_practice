import { useState, useCallback, useMemo, useRef } from 'react';
import { List, Index } from 'react-virtualized';
import { useTimeDeal } from '@/hooks/useTimeDeal';
import { TimeDealType, TimeDealItem as TimeDealItemType } from '@/types';
import { useTimeDealTabs } from '@/hooks/useTimeDealTime';

const ASPECT_RATIO = 0.6397;
const MIN_ROW_HEIGHT = 240;
const GAP_SIZE = 8;

export const useTimeDealSection = () => {
  const [tabs, nextTabs] = useTimeDealTabs();
  const [activeTab, setActiveTab] = useState<TimeDealType>('current');

  const {
    data: timeDealPagesData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useTimeDeal(activeTab);

  const items: TimeDealItemType[] = useMemo(
    () => timeDealPagesData?.pages.flatMap((page) => page.itemList) || [],
    [timeDealPagesData]
  );

  const listRef = useRef<List>(null);

  const rowHeight = useCallback(({ width }: { width: number }) => {
    const calculatedHeight = (width - GAP_SIZE / 2) / 2 / ASPECT_RATIO;
    return Math.max(MIN_ROW_HEIGHT, calculatedHeight);
  }, []);

  const loadMoreItems = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  const handleTabChange = useCallback((tab: TimeDealType) => {
    setActiveTab(tab);
  }, []);

  const isRowLoaded = useCallback(
    ({ index }: Index): boolean => index < Math.floor(items.length / 2),
    [items.length]
  );

  const loadMoreRows = useCallback(
    () =>
      new Promise<void>((resolve) => {
        loadMoreItems();
        resolve();
      }),
    [loadMoreItems]
  );

  return {
    tabs,
    nextTabs,
    activeTab,
    items,
    listRef,
    rowHeight,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    handleTabChange,
    isRowLoaded,
    loadMoreRows,
  };
};
