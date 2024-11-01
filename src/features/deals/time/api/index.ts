import { TNaverShopResponse } from '@/core/types';
import { TTimeDealResponse } from '../types';
import { api } from '@/core/api/client';
import { transformNaverItem } from '@/utils/format';

export const fetchTimeDeals = async (): Promise<TTimeDealResponse> => {
  const response = await api.get<TNaverShopResponse>('', {
    params: {
      query: '타임딜',
      display: 20,
    },
  });

  return {
    itemList: response.data.items.map(transformNaverItem),
    isLastPage: response.data.total <= 20,
  };
};
