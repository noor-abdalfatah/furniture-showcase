'use client';

export default function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className="w-full rounded-lg border border-border bg-surface px-4 py-2 outline-none transition-colors duration-150 focus:border-accent md:max-w-sm"
    />
  );
}
