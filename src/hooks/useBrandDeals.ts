import { queryKeys } from '@/constants';
import { fetchBrandDeals } from '@/services/api';
import { TBrandDealResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useBrandDeals = () => {
  return useQuery<TBrandDealResponse>({
    queryKey: [queryKeys.BRNAD_DEALS],
    queryFn: () => fetchBrandDeals(1),
  });
};
