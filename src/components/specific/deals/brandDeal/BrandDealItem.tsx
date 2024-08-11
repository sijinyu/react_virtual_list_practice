import { BrandDeal } from '@/types';
import { useInView } from 'react-intersection-observer';
import { useBrandDealProgress } from '@/hooks/useBrandDealProgess';

type BrandDealItemProps = {
  deal: BrandDeal;
};

const BrandDealItem = ({ deal }: BrandDealItemProps) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const progress = useBrandDealProgress(inView, deal.stockPercentage);

  return (
    <li ref={ref}>
      <a>
        <figure className='flex gap-x-10 w-full px-16 py-10'>
          <img
            src={deal.image}
            alt={deal.title}
            className='aspect-square h-140 object-cover rounded-lg border'
          />
          <figcaption className='flex flex-col flex-1 w-full'>
            <h2 className='text-base w-full inline-block font-semibold line-clamp-2'>
              {deal.title}
            </h2>
            <div className='relative mt-2 bg-[#FFA98E] rounded-full h-15'>
              <div
                className='absolute top-0 left-0 h-full bg-[#FF6231] rounded-full transition-all duration-500'
                style={{ width: `${progress}%` }}
              />
              <span className='absolute left-1/2 -translate-x-1/2 top-0 bottom-0 text-xs text-white'>
                {deal.stockPercentage}%
              </span>
            </div>

            <p className='text-orange-600 text-md font-bold mt-10'>
              할인가는 {deal.discountedPrice.toLocaleString()}원
            </p>
            <p className='text-gray-300 text-sm mt-1'>
              곧 정상가 {deal.originalPrice.toLocaleString()}원으로 돌아갑니다
            </p>
          </figcaption>
        </figure>
      </a>
    </li>
  );
};

export default BrandDealItem;
