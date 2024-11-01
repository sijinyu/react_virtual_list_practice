import { useState, useEffect } from 'react';
import { TIME_INTERVAL_MS } from '@/constants';
import { calculateTimeLeft } from '@/utils/time';

export const useCountdown = (endDate: string) => {
  const [timeLeft, setTimeLeft] = useState<string>(calculateTimeLeft(endDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, TIME_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [endDate]);

  return timeLeft;
};
