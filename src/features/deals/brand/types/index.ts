import { BaseTransformedItem } from '@/utils/format';

export type TBrandDeal = {
  stockPercentage: number;
  discountEndDate: string;
} & BaseTransformedItem;

export type TBrandDealResponse = {
  itemList: TBrandDeal[];
  isLastPage: boolean;
};
