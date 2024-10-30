import { useEffect, useState, useCallback, ReactNode } from 'react';

type TWindowScrollerProps = {
  cellHeight: number;
  children: (props: {
    height: number;
    isScrolling: boolean;
    scrollTop: number;
    onChildScroll: ({ scrollTop }: { scrollTop: number }) => void;
  }) => ReactNode;
};

// 고정된 헤더와 탭의 높이
const HEADER_OFFSET = 46;
const TAB_OFFSET = 45;
const TIME_INTERVAL = 45;

export const WindowScroller = ({
  cellHeight,
  children,
}: TWindowScrollerProps) => {
  const [height, setHeight] = useState(window.innerHeight);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  // 스크롤 이벤트 핸들러: 현재 스크롤 위치를 계산하여 상태를 업데이트합니다.
  const handleScroll = useCallback(() => {
    setScrollTop(window.scrollY - HEADER_OFFSET - TAB_OFFSET - cellHeight);
    setIsScrolling(true);
  }, [cellHeight]);

  // 창 크기 변경 이벤트 핸들러: 창 크기 변경 시 높이 상태를 업데이트합니다.
  const handleResize = useCallback(() => {
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  // 스크롤 중임을 나타내는 상태를 일정 시간 후에 false로 변경합니다.
  useEffect(() => {
    if (isScrolling) {
      const timer = setTimeout(() => setIsScrolling(false), TIME_INTERVAL);
      return () => clearTimeout(timer);
    }
  }, [isScrolling]);

  // 자식 컴포넌트가 스크롤할 때 호출되는 함수로, 부모 윈도우의 스크롤 위치를 조정합니다.
  const onChildScroll = useCallback(
    ({ scrollTop }: { scrollTop: number }) => {
      window.scrollTo(0, scrollTop + HEADER_OFFSET + TAB_OFFSET + cellHeight);
    },
    [cellHeight]
  );

  return <>{children({ height, isScrolling, scrollTop, onChildScroll })}</>;
};
