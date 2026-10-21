'use client';

export default function CategoryFilter({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-150 ${
              active
                ? 'border-accent bg-accent text-white'
                : 'border-border bg-surface hover:border-accent'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
