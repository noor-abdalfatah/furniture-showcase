import { describe, it, expect } from 'vitest';
import { shouldShowInstallPrompt, DISMISS_DAYS } from './use-pwa-install';

const DAY = 24 * 60 * 60 * 1000;

describe('shouldShowInstallPrompt', () => {
  it('is false when the app is already installed (standalone)', () => {
    expect(shouldShowInstallPrompt({ dismissedAt: null, now: 0, isStandalone: true })).toBe(false);
  });

  it('is false 13 days after dismissal', () => {
    const now = 13 * DAY;
    expect(shouldShowInstallPrompt({ dismissedAt: 0, now, isStandalone: false })).toBe(false);
  });

  it('is true 15 days after dismissal', () => {
    const now = 15 * DAY;
    expect(shouldShowInstallPrompt({ dismissedAt: 0, now, isStandalone: false })).toBe(true);
  });

  it('is true when never dismissed and not standalone', () => {
    expect(shouldShowInstallPrompt({ dismissedAt: null, now: 0, isStandalone: false })).toBe(true);
  });

  it('uses a 14 day dismissal window', () => {
    expect(DISMISS_DAYS).toBe(14);
  });
});

describe('storage failure', () => {
  it('readDismissedAt returns null when localStorage throws', async () => {
    const { readDismissedAt } = await import('./use-pwa-install');
    const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('storage blocked');
      },
    });
    try {
      expect(readDismissedAt()).toBeNull();
    } finally {
      if (original) Object.defineProperty(globalThis, 'localStorage', original);
    }
  });
});
