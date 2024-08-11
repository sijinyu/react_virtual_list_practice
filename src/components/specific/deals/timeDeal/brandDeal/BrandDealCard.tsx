import Card from '@/components/unit/Card';
import { useCountdown } from '@/hooks/useCountdown';
import { BrandDeal } from '@/types';
import { memo } from 'react';

type BrandDealCardProps = {
  deal: BrandDeal;
};

const BrandDealCard = ({ deal }: BrandDealCardProps) => {
  const timeLeft = useCountdown(deal.discountEndDate);

  return (
    <a>
      <Card className='w-120'>
        <Card.Image
          src={deal.image}
          alt={deal.title}
          className='border border-[#EEEFF3] rounded-8'
        />
        <Card.Content>
          <span className='text-red-600 bg-[#FFEDEE] text-sm mt-6 inline-block p-4 rounded-4 w-fit'>
            {timeLeft}
          </span>
          <Card.Title title={deal.title} className='mt-2' />
          <Card.Price
            discountRate={deal.discountRate}
            discountedPrice={deal.discountedPrice}
          />
        </Card.Content>
      </Card>
    </a>
  );
};

export default memo(BrandDealCard);
