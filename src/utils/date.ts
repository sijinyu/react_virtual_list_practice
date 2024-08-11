export const getTimeDealTabs = (): [string, string] => {
  const currentHour = new Date().getHours();
  if (currentHour >= 23 || currentHour < 7) {
    return ['7시에 시작되는 오늘의 타임특가!', ''];
  }
  if (currentHour === 22) {
    return ['오후 10시', '11시에 끝나는 오늘의 마지막 타임특가!'];
  }
  const nextHour = (currentHour + 1) % 24;
  const currentLabel = `${currentHour < 12 ? '오전' : '오후'} ${
    currentHour % 12 || 12
  }시`;
  const nextLabel = `${nextHour < 12 ? '오전' : '오후'} ${
    nextHour % 12 || 12
  }시`;

  return [currentLabel, nextLabel];
};

export const isTimeDealOpen = (hour: number): boolean => {
  return hour >= 7 && hour < 23;
};
