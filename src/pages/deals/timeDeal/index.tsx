import { Header } from '@/components/ui';

import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { FullScreenError } from '@/components/ui/FullScreenError';
import { TimeDealSection } from '@/features/deals/time/components/TimeDealSection';
import LureDealSection from '@/features/deals/lure/components/LureDealSection';
import BrandDealSection from '@/features/deals/brand/components/BrandDealSection';

const TimeDeal = () => {
  return (
    <div>
      <Header title='타임특가' isBackButtonVisible={false} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <LureDealSection />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrandDealSection />
      </ErrorBoundary>
      <ErrorBoundary
        FallbackComponent={FullScreenError}
        onReset={() => {
          window.location.reload();
        }}
      >
        <TimeDealSection />
      </ErrorBoundary>
    </div>
  );
};

export default TimeDeal;
