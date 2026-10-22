'use client';

import { usePwaInstall } from '@/hooks/use-pwa-install';

export default function InstallPrompt({ dict }: { dict: Record<string, string> }) {
  const { canInstall, isIos, visible, promptInstall, dismiss } = usePwaInstall();
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={dict['install.title']}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm"
    >
      <p className="font-semibold">{dict['install.title']}</p>
      {isIos && !canInstall ? (
        <p className="text-sm text-text-muted">{dict['install.iosSteps']}</p>
      ) : null}
      <div className="flex gap-2">
        {canInstall && (
          <button
            type="button"
            onClick={promptInstall}
            className="rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors duration-150 hover:bg-accent-hover"
          >
            {dict['install.button']}
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          className="rounded-lg border border-border px-4 py-2 text-sm transition-colors duration-150 hover:border-accent"
        >
          {dict['install.dismiss']}
        </button>
      </div>
    </div>
  );
}
