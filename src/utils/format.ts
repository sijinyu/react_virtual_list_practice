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
  const originalPrice = parseInt(item.hprice);
  const discountedPrice = parseInt(item.lprice);

  const transformed: BaseTransformedItem = {
    id: parseInt(item.productId),
    title: item.title.replace(/<[^>]*>?/g, ''),
    originalPrice,
    discountedPrice,
    discountRate: Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    ),
    image: item.image,
  };

  return transformed as T;
};
