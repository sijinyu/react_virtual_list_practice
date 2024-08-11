import { api } from '@/api/axios';
import { ENDPOINT } from '@/constants/api';
import {
  BrandDealResponse,
  LureDeal,
  TimeDealResponse,
  TimeDealType,
} from '@/types';

export const fetchLureDeals = async (): Promise<LureDeal[]> => {
  const response = await api.get<LureDeal[]>(ENDPOINT.LURE_DEALS);
  return response.data;
};

export const fetchBrandDeals = async (
  page: number
): Promise<BrandDealResponse> => {
  const response = await api.get<BrandDealResponse>(ENDPOINT.BRAND_DELAS, {
    params: { page },
  });
  return response.data;
};

export const fetchTimeDeals = async (
  time: TimeDealType,
  page: number
): Promise<TimeDealResponse> => {
  const { data } = await api.get<TimeDealResponse>(ENDPOINT.TIME_DELAS, {
    params: { time, page },
  });
  return data;
};
