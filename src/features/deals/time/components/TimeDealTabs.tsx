import { TTimeDealType } from '@/core/types';
import TimeDealTabButton from './TimeDealTabButton';

type TTabInfo = {
  label: string;
  isOpen: boolean;
};

type TTimeDealTabsProps = {
  activeTab: TTimeDealType;
  onTabChange: (tab: TTimeDealType) => void;
  currentTab: TTabInfo;
  nextTab: TTabInfo | null;
};

const TimeDealTabs = ({
  activeTab,
  onTabChange,
  currentTab,
  nextTab,
}: TTimeDealTabsProps) => {
  const isActive = activeTab === 'current';

  return (
    <div className='flex border-b py-10'>
      <TimeDealTabButton
        isActive={isActive}
        label={currentTab.label}
        onClick={() => onTabChange('current')}
      />
      {nextTab && (
        <TimeDealTabButton
          isActive={!isActive}
          label={nextTab.label}
          onClick={() => onTabChange('next')}
        />
      )}
    </div>
  );
};

export default TimeDealTabs;
