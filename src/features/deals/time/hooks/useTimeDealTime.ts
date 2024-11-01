import { getTimeDealTabs } from '@/utils/date';
import { useState, useEffect } from 'react';

export type TTabInfo = {
  label: string;
  isOpen: boolean;
};

type TuseTimeDealTabsProps = [TTabInfo, TTabInfo | null];
// 주기적으로 타임 특가 탭 정보를 업데이트하는 훅
export const useTimeDealTabs = (): TuseTimeDealTabsProps => {
  const [tabs, setTabs] = useState(getTimeDealTabs());

  useEffect(() => {
    const updateTabs = () => {
      setTabs(getTimeDealTabs());
    };

    updateTabs();

    const interval = setInterval(updateTabs, 60 * 1000); // 60,000ms = 1분

    return () => clearInterval(interval);
  }, []);

  return tabs;
};
