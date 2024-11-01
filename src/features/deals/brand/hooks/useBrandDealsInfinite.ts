import { queryKeys } from '@/constants';
import { fetchBrandDeals } from '../api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TBrandDealResponse } from '../types';

export const useBrandDealsInfinite = (initialData?: TBrandDealResponse) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.BRNAD_DEALS],
    queryFn: ({ pageParam = 1 }) => fetchBrandDeals(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.isLastPage) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
    initialData: initialData
      ? { pages: [initialData], pageParams: [undefined] }
      : undefined,
  });
};
