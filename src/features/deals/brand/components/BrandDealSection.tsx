import { useNavigate } from 'react-router-dom';
import { useBrandDealsInfinite } from '@/features/deals/brand/hooks/useBrandDealsInfinite';
import BrandDealListView from './BrandDealListView';
import { webPath } from '@/core/router';
import { Fragment, useCallback } from 'react';
import BrandDealItem from './BrandDealItem';

type TBrandDealSection = {
  type: 'thumnail' | 'list';
};
const BrandDealSection = ({ type }: TBrandDealSection) => {
  const { data, isLoading, isError, isFetchingNextPage } =
    useBrandDealsInfinite();
  const navigate = useNavigate();

  const handleClickGoToBrandDeal = useCallback(() => {
    navigate(webPath.brandDeal());
  }, [navigate]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) throw new Error('브랜드 딜을 불러오는데 실패했습니다.');
  const deals = data?.pages.flatMap((page) => page.itemList) || [];
  const isThumnail = type === 'thumnail';
  return (
    <section>
      {isThumnail ? (
        <BrandDealListView
          deals={deals}
          onGoToBrandDeal={handleClickGoToBrandDeal}
        />
      ) : (
        deals.map((deal) => {
          return (
            <Fragment key={deal.id}>
              <BrandDealItem deal={deal} />
              {isFetchingNextPage && <div>추가 로딩 중...</div>}
            </Fragment>
          );
        })
      )}
    </section>
  );
};

export default BrandDealSection;
