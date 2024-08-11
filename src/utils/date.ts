// 탭 이름과 오픈 여부를 함께 반환하도록 함수 수정
export const getTimeDealTabs = (): [
  { label: string; isOpen: boolean },
  { label: string; isOpen: boolean } | null
] => {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 23 || currentHour < 7) {
    // 23시부터 7시까지는 타임 특가가 진행되지 않음
    return [{ label: '7시에 시작되는 오늘의 타임특가!', isOpen: false }, null];
  }

  if (currentHour === 22) {
    return [
      { label: '11시에 끝나는 오늘의 마지막 타임특가!', isOpen: true },
      null,
    ];
  }
  const nextHour = (currentHour + 1) % 24;
  const currentLabel = `${currentHour < 12 ? '오전' : '오후'} ${
    currentHour % 12 || 12
  }시`;
  const nextLabel = `${nextHour < 12 ? '오전' : '오후'} ${
    nextHour % 12 || 12
  }시`;

  return [
    { label: currentLabel, isOpen: true },
    { label: nextLabel, isOpen: nextHour >= 7 && nextHour < 23 },
  ];
};

// 시간대에 따라 타임 특가가 열려 있는지 판단
export const isTimeDealOpen = (hour: number): boolean => {
  return hour >= 7 && hour < 23;
};
