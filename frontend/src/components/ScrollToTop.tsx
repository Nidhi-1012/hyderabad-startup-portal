import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If there is a pending scroll restore (e.g. returning from guide to home),
    // skip automatic scroll-to-top and let the destination page handle it.
    const hasPendingRestore = sessionStorage.getItem('home_scroll_restore');
    if (hasPendingRestore) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}
