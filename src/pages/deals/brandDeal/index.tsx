import { ErrorFallback, Header } from '@/components/ui';
import BrandDealSection from '@/features/deals/brand/components/BrandDealSection';
import { ErrorBoundary } from 'react-error-boundary';

const BrandDeal = () => {
  return (
    <div>
      <Header title='오늘의 브랜드딜' isBackButtonVisible={true} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrandDealSection />
      </ErrorBoundary>
    </div>
  );
};

export default BrandDeal;
