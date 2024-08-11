import { queryKeys } from '@/constants';
import { fetchBrandDeals } from '@/services/api';
import { BrandDealResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useBrandDeals = () => {
  return useQuery<BrandDealResponse>({
    queryKey: [queryKeys.BRNAD_DEALS],
    queryFn: () => fetchBrandDeals(1),
  });
};
