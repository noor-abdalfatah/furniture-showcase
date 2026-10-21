import type { Dimensions } from '@/types/furniture';

export default function DimensionsTable({
  dimensions,
  dict,
}: {
  dimensions: Dimensions;
  dict: Record<string, string>;
}) {
  const rows: [string, string][] = [
    [dict['product.width'], `${dimensions.widthCm} cm`],
    [dict['product.height'], `${dimensions.heightCm} cm`],
    [dict['product.depth'], `${dimensions.depthCm} cm`],
  ];
  if (dimensions.weightKg !== undefined) {
    rows.push([dict['product.weight'], `${dimensions.weightKg} kg`]);
  }
  return (
    <table className="w-full max-w-sm border-collapse text-sm">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-b border-border">
            <th scope="row" className="py-2 text-start font-normal text-text-muted">{label}</th>
            <td className="py-2 text-end">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
