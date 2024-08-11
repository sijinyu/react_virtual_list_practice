import { getTimeDealTabs } from '@/utils';
import { useState, useEffect } from 'react';

export type TabInfo = {
  label: string;
  isOpen: boolean;
};

// 주기적으로 타임 특가 탭 정보를 업데이트하는 훅
export const useTimeDealTabs = (): [TabInfo, TabInfo | null] => {
  const [tabs, setTabs] = useState<[TabInfo, TabInfo | null]>(
    getTimeDealTabs()
  );

  useEffect(() => {
    const updateTabs = () => {
      setTabs(getTimeDealTabs());
    };

    // 처음 마운트될 때 한 번 호출
    updateTabs();

    // 매 분마다 업데이트
    const interval = setInterval(updateTabs, 60 * 1000); // 60,000ms = 1분

    // 클린업 함수로 인터벌 정리
    return () => clearInterval(interval);
  }, []);

  return tabs;
};
