import { TNaverShopItem } from '@/core/types';

export interface BaseTransformedItem {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
}

export const transformNaverItem = <T extends BaseTransformedItem>(
  item: TNaverShopItem
): T => {
  const discountRate = Math.floor(Math.random() * (70 - 10 + 1)) + 10;
  const originalPrice = Math.ceil((item.lprice * 100) / (100 - discountRate));

  const transformed: BaseTransformedItem = {
    id: parseInt(item.productId),
    title: item.title.replace(/<[^>]*>?/g, ''),
    originalPrice,
    discountRate,
    discountedPrice: item.lprice,
    image: item.image,
  };

  return transformed as T;
};
