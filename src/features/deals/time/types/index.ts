import { CSSProperties } from 'react';

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

export type TGetCellData = (columnIndex: number, rowIndex: number) => TCellData;
