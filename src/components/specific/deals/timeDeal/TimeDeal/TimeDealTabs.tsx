import { TimeDealType } from '@/types';
import TabButton from './TimeDealTabButton';

type TimeDealTabsProps = {
  activeTab: TimeDealType;
  onTabChange: (tab: TimeDealType) => void;
  currentTabLabel: string;
  nextTabLabel: string;
};

const TimeDealTabs = ({
  activeTab,
  onTabChange,
  currentTabLabel,
  nextTabLabel,
}: TimeDealTabsProps) => {
  const tabs = [
    { label: currentTabLabel, type: 'current' as TimeDealType },
    { label: nextTabLabel, type: 'next' as TimeDealType },
  ];

  return (
    <div className='flex border-b py-10'>
      {tabs.map((tab) => (
        <TabButton
          key={tab.type}
          label={tab.label}
          isActive={activeTab === tab.type}
          onClick={() => onTabChange(tab.type)}
        />
      ))}
    </div>
  );
};

export default TimeDealTabs;
