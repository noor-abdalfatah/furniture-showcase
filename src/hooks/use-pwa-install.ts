'use client';

import { useCallback, useEffect, useState } from 'react';

export const DISMISS_DAYS = 14;
const STORAGE_KEY = 'pwa-install-dismissed-at';
const DAY_MS = 24 * 60 * 60 * 1000;

export function shouldShowInstallPrompt(state: {
  dismissedAt: number | null;
  now: number;
  isStandalone: boolean;
}): boolean {
  if (state.isStandalone) return false;
  if (state.dismissedAt === null) return true;
  return state.now - state.dismissedAt >= DISMISS_DAYS * DAY_MS;
}

// Storage can throw (private mode, blocked cookies). Treat that as "not dismissed".
export function readDismissedAt(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function writeDismissedAt(now: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(now));
  } catch {
    // Ignore: prompt may show again next visit.
  }
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function usePwaInstall() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissedAt, setDismissedAt] = useState<number | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsStandalone(
      window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as Navigator & { standalone?: boolean }).standalone === true,
    );
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent) && !('MSStream' in window));
    setDismissedAt(readDismissedAt());

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInteract = () => setInteracted(true);
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('click', onInteract, { once: true });
    window.addEventListener('scroll', onInteract, { once: true, passive: true });
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('click', onInteract);
      window.removeEventListener('scroll', onInteract);
    };
  }, []);

  useEffect(() => {
    const canShow = (deferred !== null || isIos) && interacted;
    setVisible(canShow && shouldShowInstallPrompt({ dismissedAt, now: Date.now(), isStandalone }));
  }, [deferred, isIos, interacted, dismissedAt, isStandalone]);

  const promptInstall = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
  }, [deferred]);

  const dismiss = useCallback(() => {
    const now = Date.now();
    writeDismissedAt(now);
    setDismissedAt(now);
    setVisible(false);
  }, []);

  return { canInstall: deferred !== null, isIos, visible, promptInstall, dismiss };
}
