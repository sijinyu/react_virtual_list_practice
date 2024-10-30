import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { TBrandDeal } from '@/types';
import { useBrandDealsInfinite } from '@/hooks/useBrandDealsInfinite';

export const useBrandDealSection = () => {
  const [deals, setDeals] = useState<TBrandDeal[]>([]);
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

  return {
    deals,
    isLoading,
    isError,
    isFetchingNextPage,
    ref,
  };
};
