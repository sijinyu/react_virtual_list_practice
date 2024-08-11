// import { useState, useCallback } from 'react';
// import InfiniteLoader from 'react-window-infinite-loader';
// import { FixedSizeGrid as Grid, GridOnItemsRenderedProps } from 'react-window';
// import { TimeDealTabs } from './TimeDealTabs';
// import { useTimeDeal } from '@/hooks/useTimeDeal';
// import { getTimeDealTabs } from '@/utils';
// import { TimeDealType } from '@/types';
// import AutoSizer from 'react-virtualized-auto-sizer';
// import { useTimeDealCell } from '@/hooks/useTimeDealCell';
// import { useTimeDealGrid } from '@/hooks/useTimeDealGrid';
// import { TimeDealCell } from './TimeDealCell';

// export const TimeDealSection = () => {
//   const [activeTab, setActiveTab] = useState<TimeDealType>('current');
//   const {
//     data: timeDealPagesData,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isError,
//     isFetchingNextPage,
//   } = useTimeDeal(activeTab);

//   const { items, itemCount, isItemLoaded, GRID_CONSTANTS } = useTimeDealGrid({
//     hasNextPage,
//     timeDealPagesData,
//   });
//   const getCellData = useTimeDealCell(items, isItemLoaded);
//   const [currentTabLabel, nextTabLabel] = getTimeDealTabs();

//   // useMemo를 사용하여 items 계산 최적화
//   const loadMoreItems = useCallback(() => {
//     if (!isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [isFetchingNextPage, fetchNextPage]);

//   const handleTabChange = useCallback((tab: TimeDealType) => {
//     setActiveTab(tab);
//   }, []);

//   if (isLoading) return <div>로딩 중...</div>;
//   if (isError) {
//     throw new Error('타임특가 섹션을 불러오는데 실패했습니다.');
//   }

//   return (
//     <section>
//       <TimeDealTabs
//         activeTab={activeTab}
//         onTabChange={handleTabChange}
//         currentTabLabel={currentTabLabel}
//         nextTabLabel={nextTabLabel}
//       />
//       <div className='h-[calc(100vh-37.5rem)] min-h-[400px]'>
//         <AutoSizer>
//           {({ width, height }) => {
//             return (
//               <InfiniteLoader
//                 isItemLoaded={isItemLoaded}
//                 itemCount={itemCount}
//                 loadMoreItems={loadMoreItems}
//               >
//                 {({ onItemsRendered, ref }) => {
//                   return (
//                     <Grid
//                       columnCount={GRID_CONSTANTS.COLUMN_COUNT}
//                       columnWidth={width / GRID_CONSTANTS.COLUMN_COUNT}
//                       height={height}
//                       rowCount={Math.ceil(
//                         itemCount / GRID_CONSTANTS.COLUMN_COUNT
//                       )}
//                       rowHeight={Math.max(
//                         GRID_CONSTANTS.MIN_ITEM_HEIGHT,
//                         (width / GRID_CONSTANTS.COLUMN_COUNT) *
//                           GRID_CONSTANTS.ASPECT_RATIO
//                       )}
//                       width={width}
//                       onItemsRendered={({
//                         visibleRowStartIndex,
//                         visibleRowStopIndex,
//                       }: GridOnItemsRenderedProps) => {
//                         const startIndex =
//                           visibleRowStartIndex * GRID_CONSTANTS.COLUMN_COUNT;
//                         const stopIndex =
//                           (visibleRowStopIndex + 1) *
//                             GRID_CONSTANTS.COLUMN_COUNT -
//                           1;
//                         onItemsRendered({
//                           overscanStartIndex: Math.max(
//                             0,
//                             startIndex - GRID_CONSTANTS.COLUMN_COUNT
//                           ),
//                           overscanStopIndex: Math.min(
//                             itemCount - 1,
//                             stopIndex + GRID_CONSTANTS.COLUMN_COUNT
//                           ),
//                           visibleStartIndex: startIndex,
//                           visibleStopIndex: stopIndex,
//                         });
//                       }}
//                       ref={ref}
//                     >
//                       {({ columnIndex, rowIndex }) => {
//                         return (
//                           <TimeDealCell
//                             columnIndex={columnIndex}
//                             rowIndex={rowIndex}
//                             data={getCellData}
//                           />
//                         );
//                       }}
//                     </Grid>
//                   );
//                 }}
//               </InfiniteLoader>
//             );
//           }}
//         </AutoSizer>
//       </div>
//     </section>
//   );
// };
