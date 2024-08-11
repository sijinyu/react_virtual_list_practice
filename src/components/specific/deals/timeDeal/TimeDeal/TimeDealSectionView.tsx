import React, { MutableRefObject, ReactNode } from 'react';
import {
  List,
  InfiniteLoader,
  AutoSizer,
  ListRowProps,
} from 'react-virtualized';
import TimeDealTabs from './TimeDealTabs';
import { TimeDealType, TimeDealItem as TimeDealItemType } from '@/types';
import TimeDealItem from './TimeDealItem';
import { WindowScroller } from '@/components/unit/WindowScroller';
import { TabInfo } from '@/hooks/useTimeDealTime';
import { isTimeDealOpen } from '@/utils';

interface TimeDealSectionViewProps {
  tabs: TabInfo;
  nextTabs: TabInfo | null;
  activeTab: TimeDealType;
  items: TimeDealItemType[];
  listRef: MutableRefObject<List | null>;
  rowHeight: ({ width }: { width: number }) => number;
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  handleTabChange: (tab: TimeDealType) => void;
  isRowLoaded: ({ index }: { index: number }) => boolean;
  loadMoreRows: () => Promise<void>;
}

const DEFAULT_WIDTH = 277;

export const TimeDealSectionView: React.FC<TimeDealSectionViewProps> = ({
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
}) => {
  const rowRenderer = ({ index, key, style }: ListRowProps): ReactNode => {
    const item1 = items[index * 2];
    const item2 = items[index * 2 + 1];
    const isOpen =
      isTimeDealOpen(new Date().getHours()) && activeTab === 'current';

    return (
      <div key={key} style={style} className='flex gap-8 w-full'>
        <TimeDealItem item={item1} isOpen={isOpen} />
        <TimeDealItem item={item2} isOpen={isOpen} />
      </div>
    );
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) {
    throw new Error('타임특가 섹션을 불러오는데 실패했습니다.');
  }

  return (
    <section>
      <TimeDealTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentTab={tabs}
        nextTab={nextTabs}
      />
      <article className='pt-8 px-16'>
        <WindowScroller cellHeight={rowHeight({ width: DEFAULT_WIDTH })}>
          {({ height, isScrolling, scrollTop, onChildScroll }) => (
            <AutoSizer disableHeight>
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
                    />
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
