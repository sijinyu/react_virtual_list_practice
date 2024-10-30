import { MutableRefObject, ReactNode } from 'react';
import {
  List,
  InfiniteLoader,
  AutoSizer,
  ListRowProps,
} from 'react-virtualized';
import TimeDealTabs from './TimeDealTabs';
import { TTimeDealType, TTimeDealItem as TimeDealItemType } from '@/types';
import TimeDealItem from './TimeDealItem';
import { WindowScroller } from '@/components/unit/WindowScroller';
import { TTabInfo } from '@/hooks/useTimeDealTime';
import { isTimeDealOpen } from '@/utils';

interface TTimeDealSectionViewProps {
  tabs: TTabInfo;
  nextTabs: TTabInfo | null;
  activeTab: TTimeDealType;
  items: TimeDealItemType[];
  listRef: MutableRefObject<List | null>;
  rowHeight: ({ width }: { width: number }) => number;
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  handleTabChange: (tab: TTimeDealType) => void;
  isRowLoaded: ({ index }: { index: number }) => boolean; // 특정 행이 로드되었는지 확인하는 함수
  loadMoreRows: () => Promise<void>;
}

// 기본 너비 상수
const DEFAULT_WIDTH = 277;

// 타임딜 섹션 뷰 컴포넌트
export const TimeDealSectionView = ({
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
}: TTimeDealSectionViewProps) => {
  // 각 행을 렌더링하는 함수
  const rowRenderer = ({ index, key, style }: ListRowProps): ReactNode => {
    // 한 행에 두 개의 아이템을 표시
    const item1 = items[index * 2];
    const item2 = items[index * 2 + 1];

    // 현재 시간에 따라 타임딜이 열려 있는지 확인
    const isOpen =
      isTimeDealOpen(new Date().getHours()) && activeTab === 'current';

    // 두 개의 타임딜 아이템을 나란히 렌더링
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
      {/* 탭 컴포넌트 */}
      <TimeDealTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentTab={tabs}
        nextTab={nextTabs}
      />
      <article className='pt-8 px-16'>
        <WindowScroller cellHeight={rowHeight({ width: DEFAULT_WIDTH })}>
          {({ height, isScrolling, scrollTop, onChildScroll }) => (
            // AutoSizer를 사용해 동적으로 너비를 조정
            <AutoSizer disableHeight>
              {({ width }) => (
                <InfiniteLoader
                  isRowLoaded={isRowLoaded}
                  loadMoreRows={loadMoreRows}
                  rowCount={Math.ceil(items.length / 2) + (hasNextPage ? 1 : 0)} // 행 개수를 계산
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
                      onScroll={({ scrollTop }) => onChildScroll({ scrollTop })} // 스크롤 위치 변경 핸들러
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
