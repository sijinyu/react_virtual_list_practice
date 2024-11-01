import { useLureDeals } from '@/features/deals/lure/hooks/useLureDeals';
import LureDealListView from './LureDealListView';

const LureDealSection = () => {
  const { deals, isLoading, isError } = useLureDeals();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) throw new Error('순삭특가 섹션을 불러오는데 실패했습니다.');

  return <LureDealListView deals={deals} />;
};

export default LureDealSection;
