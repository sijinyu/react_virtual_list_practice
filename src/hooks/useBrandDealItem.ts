import { useInView } from 'react-intersection-observer';
import { useBrandDealProgress } from '@/hooks/useBrandDealProgess';
import { TBrandDeal } from '@/types';

export const useBrandDealItem = (deal: TBrandDeal) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const progress = useBrandDealProgress(inView, deal.stockPercentage);

  return {
    ref,
    progress,
  };
};
