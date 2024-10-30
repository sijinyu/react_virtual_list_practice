import { CSSProperties } from 'react';

export type TNaverShopResponse = {
  total: number;
  start: number;
  display: number;
  items: TNaverShopItem[];
};

export type TLureDeal = {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
};

export interface TNaverShopItem {
  productId: string;
  title: string;
  image: string;
  lprice: string; // 최저가
  hprice: string; // 정가
  mallName: string;
  brand: string;
  maker: string;
}

export type TBrandDeal = {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  stockPercentage: number;
  image: string;
  discountEndDate: string;
};

export type TBrandDealResponse = {
  itemList: TBrandDeal[];
  isLastPage: boolean;
};

export type TTimeDealType = 'current' | 'next';

export type TTimeDealItem = {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
};

export type TTimeDealResponse = {
  itemList: TTimeDealItem[];
  isLastPage: boolean;
};

export type TCellData =
  | {
      item: TTimeDealItem;
      isOpen: boolean;
      style: CSSProperties;
      isLoading: false;
    }
  | {
      isLoading: true;
      style: CSSProperties;
    }
  | null;

export type TGetCellData = (columnIndex: number, rowIndex: number) => CellData;
