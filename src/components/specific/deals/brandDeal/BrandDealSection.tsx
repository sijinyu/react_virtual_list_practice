import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { BrandDeal } from '@/types';
import { useBrandDealsInfinite } from '@/hooks/useBrandDealsInfinite';
import BrandDealItem from './BrandDealItem';

const BrandDealSection = () => {
  const [deals, setDeals] = useState<BrandDeal[]>([]);
  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useBrandDealsInfinite();

  useEffect(() => {
    if (data) {
      setDeals((prevDeals) => [
        ...prevDeals,
        ...data.pages.flatMap((page) => page.itemList),
      ]);
    }
  }, [data]);

  const loadMoreItems = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (inView) {
      loadMoreItems();
    }
  }, [inView, loadMoreItems]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) throw new Error('브랜드딜 페이지를 불러오는데 실패했습니다.');

  return (
    <section>
      <ul className='flex flex-col w-full pt-10'>
        {deals.map((deal) => (
          <BrandDealItem key={deal.id} deal={deal} />
        ))}
      </ul>
      <div ref={ref} className='py-4'>
        {isFetchingNextPage && <div>로딩 중...</div>}
      </div>
    </section>
  );
};

export default BrandDealSection;
