import { Header } from '@/components';
import { LureDealSection } from '@/components/specific/deals/timeDeal/LureDeal';
import { BrandDealSection } from '@/components/specific/deals/timeDeal/brandDeal';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/unit/ErrorFallback';
import { FullScreenError } from '@/components/unit/FullScreenError';
import { TimeDealSection } from '@/components/specific/deals/timeDeal/TimeDeal/TimeDealSection';

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
