import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import TimeDealTabs from './TimeDealTabs';
import { useTimeDeal } from '@/hooks/useTimeDeal';
import { getTimeDealTabs, isTimeDealOpen } from '@/utils';
import { TimeDealType } from '@/types';
import TimeDealItem from './TimeDealItem';

const TimeDealSection = () => {
  const [activeTab, setActiveTab] = useState<TimeDealType>('current');
  const {
    data: timeDealPagesData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useTimeDeal(activeTab);

  const [currentLabel, nextLabel] = getTimeDealTabs();
  const items = timeDealPagesData?.pages.flatMap((page) => page.itemList) || [];
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMoreItems = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (loadMoreRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreItems();
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 1.0,
        }
      );

      observer.observe(loadMoreRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [loadMoreItems]);

  const handleTabChange = useCallback((tab: TimeDealType) => {
    setActiveTab(tab);
  }, []);

  const isOpen = useMemo(() => isTimeDealOpen(new Date().getHours()), []);

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
      <div className='grid grid-cols-2 gap-8 px-16 pt-8'>
        {items.map((item) => (
          <TimeDealItem key={item.id} item={item} isOpen={isOpen} />
        ))}
      </div>
      <div ref={loadMoreRef} className='h-1' />
      {isFetchingNextPage && <div>추가 로딩 중...</div>}
    </section>
  );
};
export default TimeDealSection;
