import { useEffect } from 'react';
import { useTimeDealSection } from '../hooks/useTimeDealSection';
import { TimeDealSectionView } from './TimeDealSectionView';

export const TimeDealSection = () => {
  const {
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
  } = useTimeDealSection();

  useEffect(() => {
    const handleResize = () => {
      listRef.current?.recomputeRowHeights();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [listRef]);

  return (
    <TimeDealSectionView
      tabs={tabs}
      nextTabs={nextTabs}
      activeTab={activeTab}
      items={items}
      listRef={listRef}
      rowHeight={rowHeight}
      isLoading={isLoading}
      isError={isError}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      handleTabChange={handleTabChange}
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
    />
  );
};
