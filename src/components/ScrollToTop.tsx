// ScrollToTop.tsx
import { useLocation } from 'react-router-dom';
import { useLayoutEffect, useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Disable browser scroll restore
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => {
      // Optional: reset when component unmounts
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  // Force scroll to top on route change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
