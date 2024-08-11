import { LureDeal } from '@/types';
import { memo } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import LureDealCard from './LureDealCard';

type LureDealListViewProps = {
  deals: LureDeal[];
};

const LureDealListView = ({ deals }: LureDealListViewProps) => (
  <section className='bg-orange-500 pb-32 px-16'>
    <header>
      <h2 className='text-white text-xl font-bold mb-4 pt-16 pb-10'>
        오늘만 이 가격, 순삭특가!
      </h2>
    </header>
    <ScrollMenu scrollContainerClassName='scrollbar-hide'>
      <ul className='flex gap-12'>
        {deals.map((deal) => (
          <LureDealCard key={deal.id} deal={deal} />
        ))}
      </ul>
    </ScrollMenu>
  </section>
);

export default memo(LureDealListView);
