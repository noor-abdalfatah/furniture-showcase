// Fetches free-license photos from Pexels for each product and the hero.
// Usage: PEXELS_API_KEY=your_key npm run images:fetch
// Get a free key at https://www.pexels.com/api/
// Writes images to public/images/ and a credit list to src/data/image-credits.json.
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error('Missing PEXELS_API_KEY. Set it, then run again.');
  process.exit(1);
}

// Each entry: where the image goes, the search query, and the Pexels color filter.
const JOBS = [
  { file: 'hero.jpg', query: 'scandinavian living room furniture', color: 'brown', size: 'large2x', landscape: true, pick: 0 },
  { file: 'products/nour-sofa-1.jpg', query: 'grey l shape sofa living room', color: 'gray', size: 'large', pick: 0 },
  { file: 'products/nour-sofa-2.jpg', query: 'grey sofa minimal interior', color: 'gray', size: 'large', pick: 1 },
  { file: 'products/olive-dining-table-1.jpg', query: 'wooden dining table six chairs', color: 'brown', size: 'large', pick: 0 },
  { file: 'products/olive-dining-table-2.jpg', query: 'olive wood dining table', color: 'green', size: 'large', pick: 1 },
  { file: 'products/two-door-wardrobe-1.jpg', query: 'white wardrobe bedroom minimal', color: 'white', size: 'large', pick: 0 },
  { file: 'products/two-door-wardrobe-2.jpg', query: 'white two door wardrobe', color: 'white', size: 'large', pick: 1 },
  { file: 'products/minimal-pine-bed-1.jpg', query: 'pine wood bed minimal bedroom', color: 'brown', size: 'large', pick: 0 },
  { file: 'products/minimal-pine-bed-2.jpg', query: 'wooden bed frame scandinavian', color: 'brown', size: 'large', pick: 1 },
  { file: 'products/corner-desk-1.jpg', query: 'oak corner desk home office', color: 'brown', size: 'large', pick: 0 },
  { file: 'products/corner-desk-2.jpg', query: 'corner desk workspace', color: 'brown', size: 'large', pick: 1 },
  { file: 'products/wall-tv-unit-1.jpg', query: 'wall mounted tv unit living room', color: 'gray', size: 'large', pick: 0 },
  { file: 'products/wall-tv-unit-2.jpg', query: 'floating tv cabinet wood', color: 'gray', size: 'large', pick: 1 },
];

async function search(job) {
  const params = new URLSearchParams({ query: job.query, per_page: '10', color: job.color });
  if (job.landscape) params.set('orientation', 'landscape');
  const res = await fetch(`https://api.pexels.com/v1/search?${params}`, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`Pexels ${res.status} for "${job.query}"`);
  const data = await res.json();
  const photo = data.photos[job.pick];
  if (!photo) throw new Error(`No result #${job.pick} for "${job.query}"`);
  return photo;
}

const credits = [];
for (const job of JOBS) {
  const photo = await search(job);
  const url = photo.src[job.size];
  const img = await fetch(url);
  const out = `public/images/${job.file}`;
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, Buffer.from(await img.arrayBuffer()));
  credits.push({ file: job.file, query: job.query, photographer: photo.photographer, pexelsUrl: photo.url });
  console.log(`saved ${out}  (${photo.photographer})`);
}

await writeFile('src/data/image-credits.json', JSON.stringify(credits, null, 2) + '\n');
console.log('Done. Review the images in public/images and src/data/image-credits.json.');
