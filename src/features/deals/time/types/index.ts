import { BaseTransformedItem } from '@/utils/format';
import { CSSProperties } from 'react';

export type TTimeDealType = 'current' | 'next';

export type TTimeDealItem = BaseTransformedItem;

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
