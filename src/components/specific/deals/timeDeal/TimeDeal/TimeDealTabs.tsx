import { TimeDealType } from '@/types';
import TimeDealTabButton from './TimeDealTabButton';

type TabInfo = {
  label: string;
  isOpen: boolean;
};

type TimeDealTabsProps = {
  activeTab: TimeDealType;
  onTabChange: (tab: TimeDealType) => void;
  currentTab: TabInfo;
  nextTab: TabInfo | null;
};

const TimeDealTabs = ({
  activeTab,
  onTabChange,
  currentTab,
  nextTab,
}: TimeDealTabsProps) => {
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
