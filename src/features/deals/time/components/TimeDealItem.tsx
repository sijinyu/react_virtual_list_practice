import { memo } from 'react';
import Card from '@/components/ui/Card';
import { TTimeDealItem as TimeDealItemType } from '../types';
import { Mask } from '@/components/ui';

type TTimeDealItemProps = {
  item: TimeDealItemType;
  isOpen: boolean;
};

const TimeDealItem = ({ item, isOpen }: TTimeDealItemProps) => (
  <a referrerPolicy='no-referrer' className='flex flex-col w-full'>
    <Card className='w-full flex-1'>
      <figure className='relative aspect-square'>
        <Card.Image
          src={item.image}
          alt={item.title}
          className='absolute top-0 left-0 w-full h-full object-contain p-2 border rounded-10 bg-white'
        />
        {!isOpen && <Mask title='오픈 예정' />}
      </figure>
      <Card.Content>
        <Card.Title title={item.title} />
        <div>
          <Card.Price discountedPrice={item.discountedPrice} />
        </div>
      </Card.Content>
    </Card>
  </a>
);

export default memo(TimeDealItem);
