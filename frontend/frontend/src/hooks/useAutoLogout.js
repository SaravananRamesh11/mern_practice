import { useEffect } from 'react';
import { useCounter } from './conthook';
import axios from 'axios';

export const useAutoLogout = () => {
  const { dispatch, state } = useCounter();

  useEffect(() => {
    if (!state.isLoggedIn) return;

    const handleBeforeUnload = (e) => {
      // Try to send beacon if supported (asynchronous, works even after window closes)
      if (navigator.sendBeacon) {
        const data = new Blob(
          [JSON.stringify({ token: localStorage.getItem('token') })],
          { type: 'application/json' }
        );
        navigator.sendBeacon('/api/logout', data);
      }

      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch, state.isLoggedIn]);
};