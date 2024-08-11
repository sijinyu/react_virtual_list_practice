import { memo } from 'react';
import Card from '@/components/unit/Card';
import { TimeDealItem as TimeDealItemType } from '@/types';
import { Mask } from '@/components/unit';

type TimeDealItemProps = {
  item: TimeDealItemType;
  isOpen: boolean;
};

const TimeDealItem = ({ item, isOpen }: TimeDealItemProps) => (
  <a>
    <Card className='w-full'>
      <figure className='relative'>
        <Card.Image
          src={item.image}
          alt={item.title}
          className='border rounded-10'
        />
        {!isOpen && <Mask title='오픈 예정' />}
      </figure>
      <Card.Content>
        <Card.Title title={item.title} />

        <div>
          <p className='text-gray-500 line-through' aria-label='원래 가격'>
            {item.originalPrice.toLocaleString()}원
          </p>
          <Card.Price
            discountRate={item.discountRate}
            discountedPrice={item.discountedPrice}
            aria-label={`할인된 가격: ${item.discountedPrice.toLocaleString()}원, 할인율: ${
              item.discountRate
            }%`}
          />
        </div>
      </Card.Content>
    </Card>
  </a>
);

export default memo(TimeDealItem);
