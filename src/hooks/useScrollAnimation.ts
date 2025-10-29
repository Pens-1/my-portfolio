import { useEffect, useState } from 'react';

export const useScrollAnimation = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold }
    );

    return () => observer.disconnect();
  }, [threshold]);

  return isVisible;
};
