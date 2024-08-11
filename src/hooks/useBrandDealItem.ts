import { useInView } from 'react-intersection-observer';
import { useBrandDealProgress } from '@/hooks/useBrandDealProgess';
import { BrandDeal } from '@/types';

export const useBrandDealItem = (deal: BrandDeal) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const progress = useBrandDealProgress(inView, deal.stockPercentage);

  return {
    ref,
    progress,
  };
};
