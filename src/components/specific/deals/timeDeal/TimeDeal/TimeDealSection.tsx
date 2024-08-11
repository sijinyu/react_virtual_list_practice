import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import {
  List,
  InfiniteLoader,
  AutoSizer,
  Index,
  ListRowProps,
} from 'react-virtualized';
import TimeDealTabs from './TimeDealTabs';
import { useTimeDeal } from '@/hooks/useTimeDeal';
import { getTimeDealTabs, isTimeDealOpen } from '@/utils';
import { TimeDealType, TimeDealItem as TimeDealItemType } from '@/types';
import TimeDealItem from './TimeDealItem';
import { WindowScroller } from '@/components/unit/WindowScroller';

const ASPECT_RATIO = 0.6397;
const MIN_ROW_HEIGHT = 240;
const DEFAULT_WIDTH = 277;
const GAP_SIZE = 8;

const useRowHeight = () => {
  return useCallback(({ width }: { width: number }) => {
    // 계산된 높이가 최소 높이보다 작으면 최소 높이를 반환합니다.
    const calculatedHeight = (width - GAP_SIZE / 2) / 2 / ASPECT_RATIO;
    return Math.max(MIN_ROW_HEIGHT, calculatedHeight);
  }, []);
};

// 리사이즈 이벤트 핸들링 로직을 분리합니다.
const useResizeHandler = (listRef: React.RefObject<List>) => {
  useEffect(() => {
    const handleResize = () => {
      // 리사이즈 시 행 높이를 다시 계산합니다.
      listRef.current?.recomputeRowHeights();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [listRef]);
};

export const TimeDealSection = () => {
  // 현재 활성화된 탭을 관리합니다.
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

  const listRef = useRef<List | null>(null);

  // 행 높이 계산 훅 호출
  const rowHeight = useRowHeight();

  // 무한 스크롤을 위한 아이템 로딩 함수
  const loadMoreItems = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  // 현재와 다음 탭 라벨
  const [currentLabel, nextLabel] = getTimeDealTabs();

  // 탭 변경 핸들러
  const handleTabChange = useCallback((tab: TimeDealType) => {
    setActiveTab(tab);
  }, []);

  // 현재 시간이 특가 시간이 맞는지 확인합니다.
  const isOpen = useMemo(() => isTimeDealOpen(new Date().getHours()), []);

  // 로딩된 행인지 확인하는 함수
  const isRowLoaded = useCallback(
    ({ index }: Index): boolean => index < Math.floor(items.length / 2),
    [items.length]
  );

  // 추가 행 로딩 함수
  const loadMoreRows = useCallback(
    () =>
      new Promise<void>((resolve) => {
        loadMoreItems();
        resolve();
      }),
    [loadMoreItems]
  );

  // 각 행을 렌더링하는 함수
  const rowRenderer = useCallback(
    ({ index, key, style }: ListRowProps): ReactNode => {
      const item1 = items[index * 2];
      const item2 = items[index * 2 + 1];

      return (
        <div key={key} style={style} className='flex gap-8 w-full'>
          <TimeDealItem item={item1} isOpen={isOpen} />
          <TimeDealItem item={item2} isOpen={isOpen} />
        </div>
      );
    },
    [items, isOpen]
  );

  useResizeHandler(listRef);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) {
    throw new Error('타임특가 섹션을 불러오는데 실패했습니다.');
  }

  return (
    <section>
      <TimeDealTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentTabLabel={currentLabel}
        nextTabLabel={nextLabel}
      />
      <article className='pt-8 px-16'>
        {/* WindowScroller로 스크롤 위치를 관리하고 동적 높이를 전달합니다. */}
        <WindowScroller cellHeight={rowHeight({ width: DEFAULT_WIDTH })}>
          {({ height, isScrolling, scrollTop, onChildScroll }) => (
            <AutoSizer disableHeight onResize={() => console.log(listRef)}>
              {({ width }) => (
                <InfiniteLoader
                  isRowLoaded={isRowLoaded}
                  loadMoreRows={loadMoreRows}
                  rowCount={Math.ceil(items.length / 2) + (hasNextPage ? 1 : 0)}
                >
                  {({ onRowsRendered, registerChild }) => (
                    <List
                      ref={(list) => {
                        listRef.current = list;
                        registerChild(list);
                      }}
                      autoHeight
                      width={width}
                      height={height}
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      onScroll={({ scrollTop }) => onChildScroll({ scrollTop })}
                      onRowsRendered={onRowsRendered}
                      rowHeight={rowHeight({ width })}
                      rowCount={Math.ceil(items.length / 2)}
                      rowRenderer={rowRenderer}
                    ></List>
                  )}
                </InfiniteLoader>
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </article>
      {isFetchingNextPage && <div>추가 로딩 중...</div>}
    </section>
  );
};
