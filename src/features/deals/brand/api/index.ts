import { api } from '@/core/api/client';
import { TBrandDealResponse } from '../types';
import { TNaverShopItem, TNaverShopResponse } from '@/core/types';
import { transformNaverItem } from '@/utils/format';

export const fetchBrandDeals = async (
  page: number
): Promise<TBrandDealResponse> => {
  const response = await api.get<TNaverShopResponse>('', {
    params: {
      query: '브랜드할인',
      display: 20,
      start: (page - 1) * 20 + 1,
    },
  });

  const items = response.data.items.map((item: TNaverShopItem) => ({
    ...transformNaverItem(item),
    stockPercentage: Math.floor(Math.random() * 100),
    discountEndDate: new Date(
      Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));

  return {
    itemList: items,
    isLastPage: response.data.total <= page * 20,
  };
};
