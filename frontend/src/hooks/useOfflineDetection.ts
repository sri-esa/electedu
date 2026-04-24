/**
 * useOfflineDetection Hook
 * Implements REQ-10: Detects network offline state globally
 */
import { useEffect, useState } from 'react';
import { useSettingsStore } from '../store/settings.store';

export function useOfflineDetection() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { setAppState } = useSettingsStore();

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
    };

    const handleOffline = () => {
      setIsOffline(true);
      // Trigger offline fallback state when network is completely gone
      setAppState('OFFLINE_FALLBACK');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setAppState]);

  return isOffline;
}
