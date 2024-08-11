import { useQuery } from '@tanstack/react-query';
import { fetchLureDeals } from '@/services/api';
import { LureDeal } from '@/types';
import { queryKeys } from '@/constants/queryKeys';

export const useLureDeals = () => {
  const { data, error, isLoading, isError } = useQuery<LureDeal[], Error>({
    queryKey: [queryKeys.LURE_DEALS],
    queryFn: fetchLureDeals,
  });

  return {
    deals: data || [],
    isLoading,
    isError,
  };
};
