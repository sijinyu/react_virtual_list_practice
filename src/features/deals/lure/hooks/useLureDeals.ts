import { useQuery } from '@tanstack/react-query';
import { fetchLureDeals } from '@/services/api';
import { TLureDeal } from '@/core/types';
import { queryKeys } from '@/constants/queryKeys';

export const useLureDeals = () => {
  const { data, isLoading, isError } = useQuery<TLureDeal[], Error>({
    queryKey: [queryKeys.LURE_DEALS],
    queryFn: fetchLureDeals,
  });

  return {
    deals: data || [],
    isLoading,
    isError,
  };
};
