import { api } from '@/api/axios';
import {
  TBrandDealResponse,
  TLureDeal,
  TNaverShopItem,
  TNaverShopResponse,
  TTimeDealResponse,
} from '@/types';

const transformNaverItem = (item: TNaverShopItem): TLureDeal => {
  const originalPrice = parseInt(item.hprice);
  const discountedPrice = parseInt(item.lprice);

  return {
    id: parseInt(item.productId),
    title: item.title.replace(/<[^>]*>?/g, ''), // HTML 태그 제거
    originalPrice,
    discountedPrice,
    discountRate: Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    ),
    image: item.image,
  };
};

export const fetchLureDeals = async (): Promise<TLureDeal[]> => {
  const response = await api.get<TNaverShopResponse>('', {
    params: { query: '할인상품', display: 20 },
  });
  return response.data.items.map(transformNaverItem);
};

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

export const fetchTimeDeals = async (): Promise<TTimeDealResponse> => {
  const response = await api.get<TNaverShopResponse>('', {
    params: {
      query: '타임딜',
      display: 20,
    },
  });
  console.log(response, '-');

  return {
    itemList: response.data.items.map(transformNaverItem),
    isLastPage: response.data.total <= 20,
  };
};
