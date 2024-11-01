import { useNavigate } from 'react-router-dom';
import { useBrandDealsInfinite } from '@/features/deals/brand/hooks/useBrandDealsInfinite';
import BrandDealListView from './BrandDealListView';
import { webPath } from '@/core/router';
import { useCallback } from 'react';

const BrandDealSection = () => {
  const { data, isLoading, isError, isFetchingNextPage } =
    useBrandDealsInfinite();
  const navigate = useNavigate();

  const handleClickGoToBrandDeal = useCallback(() => {
    navigate(webPath.brandDeal());
  }, [navigate]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) throw new Error('브랜드 딜을 불러오는데 실패했습니다.');

  return (
    <section>
      <BrandDealListView
        deals={data?.pages.flatMap((page) => page.itemList) || []}
        onGoToBrandDeal={handleClickGoToBrandDeal}
      />
      {isFetchingNextPage && <div>추가 로딩 중...</div>}
    </section>
  );
};

export default BrandDealSection;
