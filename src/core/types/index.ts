export type TNaverShopResponse = {
  total: number;
  start: number;
  display: number;
  items: TNaverShopItem[];
};

export interface TNaverShopItem {
  productId: string;
  title: string;
  image: string;
  lprice: number; // 최저가
  hprice: number; // 정가
  mallName: string;
  brand: string;
  maker: string;
}
