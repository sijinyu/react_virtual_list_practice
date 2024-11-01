import { transformNaverItem } from '@/utils/format';
import { TLureDeal } from '../types';
import { api } from '@/core/api/client';
import { TNaverShopResponse } from '@/core/types';

export const fetchLureDeals = async (): Promise<TLureDeal[]> => {
  const response = await api.get<TNaverShopResponse>('', {
    params: { query: '할인상품', display: 20 },
  });
  return response.data.items.map(transformNaverItem);
};
