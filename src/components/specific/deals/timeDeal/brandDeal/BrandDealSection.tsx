import { useBrandDeals } from '@/hooks/useBrandDeals';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@/router';
import BrandDealListView from './BrandDealListView';

const BrandDealSection = () => {
  const { data: deals, isLoading, isError } = useBrandDeals();
  const navigate = useNavigate();

  const handleClickGoToBrandDeal = () => {
    navigate(webPath.brandDeal());
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) throw new Error('브랜드 딜을 불러오는데 실패했습니다.');

  return (
    <BrandDealListView
      deals={deals?.itemList || []}
      onGoToBrandDeal={handleClickGoToBrandDeal}
    />
  );
};

export default BrandDealSection;
