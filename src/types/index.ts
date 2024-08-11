import { CSSProperties } from 'react';

export type LureDeal = {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
};

export type BrandDeal = {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  stockPercentage: number;
  image: string;
  discountEndDate: string;
};

export type BrandDealResponse = {
  itemList: BrandDeal[];
  isLastPage: boolean;
};

export type TimeDealType = 'current' | 'next';

export type TimeDealItem = {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
};

export type TimeDealResponse = {
  itemList: TimeDealItem[];
  isLastPage: boolean;
};

export type CellData =
  | {
      item: TimeDealItem;
      isOpen: boolean;
      style: CSSProperties;
      isLoading: false;
    }
  | {
      isLoading: true;
      style: CSSProperties;
    }
  | null;

export type GetCellData = (columnIndex: number, rowIndex: number) => CellData;
