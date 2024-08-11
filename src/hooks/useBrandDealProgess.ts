import { useState, useEffect } from 'react';

export const useBrandDealProgress = (
  inView: boolean,
  stockPercentage: number
) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= stockPercentage) {
            clearInterval(interval);
            return stockPercentage;
          }
          return newProgress;
        });
      }, 10);

      return () => clearInterval(interval);
    }
  }, [inView, stockPercentage]);

  return progress;
};
