import { useState, useCallback, useMemo, useRef } from 'react';
import { List, Index } from 'react-virtualized';
import { TTimeDealType, TTimeDealItem as TimeDealItemType } from '../types';
import { useTimeDealTabs } from './useTimeDealTime';
import { useTimeDeal } from './useTimeDeal';

const ASPECT_RATIO = 0.6397; // 이미지의 가로 세로 비율
const MIN_ROW_HEIGHT = 240; // 행의 최소 높이
const GAP_SIZE = 8; // 카드 간의 간격 크기

export const useTimeDealSection = () => {
  const [tabs, nextTabs] = useTimeDealTabs();
  const [activeTab, setActiveTab] = useState<TTimeDealType>('current');
  sessionStorage.getItem('timeTab');

  const {
    data: timeDealPagesData,
    fetchNextPage, // 다음 페이지 데이터를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부
    isLoading, // 데이터 로딩 상태
    isError,
    isFetchingNextPage, // 추가 페이지를 가져오는 중인지 여부
  } = useTimeDeal(activeTab);

  const items: TimeDealItemType[] = useMemo(
    () => timeDealPagesData?.pages.flatMap((page) => page.itemList) || [],
    [timeDealPagesData]
  );

  const listRef = useRef<List>(null);

  // 행의 높이를 계산하는 함수
  // 화면의 가로 너비에 따라 높이가 비례하도록 계산
  const rowHeight = useCallback(({ width }: { width: number }) => {
    // (width - GAP_SIZE / 2): 카드 간의 간격을 고려한 너비 계산
    // / 2: 한 행에 두 개의 카드가 배치되므로 두 개로 나눈다
    const calculatedHeight = (width - GAP_SIZE / 2) * ASPECT_RATIO;

    // 최소 높이보다 작은 경우에는 최소 높이로 설정
    return Math.max(MIN_ROW_HEIGHT, calculatedHeight);
  }, []);

  // 무한 스크롤에서 추가 데이터를 로드하는 함수
  const loadMoreItems = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage(); // 다음 페이지 데이터를 가져옴
    }
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  // 탭 변경 시 호출되는 함수
  const handleTabChange = useCallback((tab: TTimeDealType) => {
    sessionStorage.setItem('timeTab', tab);
    setActiveTab(tab);
  }, []);

  // 현재 행이 로드되었는지 확인하는 함수
  // 한 행에 두 개의 아이템이 들어가므로 `index`를 2로 나누어 판단
  const isRowLoaded = useCallback(
    ({ index }: Index): boolean => index < Math.floor(items.length / 2),
    [items.length]
  );

  // 추가 행을 로드하는 함수, 비동기적으로 무한 스크롤에서 호출됨
  const loadMoreRows = useCallback(
    () =>
      new Promise<void>((resolve) => {
        loadMoreItems();
        resolve();
      }),
    [loadMoreItems]
  );

  return {
    tabs, // 탭 데이터
    nextTabs, // 다음 탭 데이터
    activeTab, // 현재 활성화된 탭
    items, // 평탄화된 아이템 목록
    listRef, // react-virtualized List 참조
    rowHeight, // 행 높이 계산 함수
    isLoading, // 로딩 상태
    isError, // 에러 발생 여부
    isFetchingNextPage, // 추가 페이지 로딩 중 여부
    hasNextPage, // 다음 페이지 존재 여부
    handleTabChange, // 탭 변경 함수
    isRowLoaded, // 현재 행이 로드되었는지 확인
    loadMoreRows, // 추가 행 로드 함수
  };
};
