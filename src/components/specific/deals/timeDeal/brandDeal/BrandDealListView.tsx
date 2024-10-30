import { TBrandDeal } from '@/types';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import BrandDealCard from './BrandDealCard';

type TBrandDealListViewProps = {
  deals: TBrandDeal[];
  onGoToBrandDeal: () => void;
};

const BrandDealListView = ({
  deals,
  onGoToBrandDeal,
}: TBrandDealListViewProps) => {
  return (
    <section className='flex flex-col px-16 pb-16'>
      <header className='flex justify-between'>
        <h2 className='text-xl font-bold mb-4 pt-16 pb-10'>오늘의 브랜드 딜</h2>
        <button
          className='text-gray-500 hover:underline'
          onClick={onGoToBrandDeal}
        >
          전체보기
        </button>
      </header>
      <ScrollMenu scrollContainerClassName='scrollbar-hide'>
        <ul className='flex space-x-12'>
          {deals.map((deal) => (
            <BrandDealCard key={deal.id} deal={deal} />
          ))}
        </ul>
      </ScrollMenu>
    </section>
  );
};

export default BrandDealListView;
