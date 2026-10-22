'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/serwist/sw.js', { scope: '/' }).catch(() => {
      // Registration failure leaves the site working online; no UI needed.
    });
  }, []);
  return null;
}
