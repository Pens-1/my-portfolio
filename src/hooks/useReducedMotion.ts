import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const initial = () => {
  if (typeof window === 'undefined') return false;
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('rm') === '1') {
    return true;
  }
  return window.matchMedia(QUERY).matches;
};

export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(initial);

  useEffect(() => {
    if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('rm') === '1') {
      return;
    }
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
};
