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
