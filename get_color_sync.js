import fs from 'fs';
import { PNG } from 'pngjs';

const data = fs.readFileSync('src/assets/alsalama-logo.png');
const png = PNG.sync.read(data);

const colors = {};
for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) << 2;
    const r = png.data[idx];
    const g = png.data[idx+1];
    const b = png.data[idx+2];
    const a = png.data[idx+3];
    
    if (a > 10) {
      if (r > 240 && g > 240 && b > 240) continue;
      if (r < 15 && g < 15 && b < 15) continue;
      
      const rBin = Math.round(r / 5) * 5;
      const gBin = Math.round(g / 5) * 5;
      const bBin = Math.round(b / 5) * 5;
      
      const hex = '#' + [rBin, gBin, bBin].map(x => Math.min(255, x).toString(16).padStart(2, '0')).join('');
      colors[hex] = (colors[hex] || 0) + 1;
    }
  }
}

const sorted = Object.entries(colors).sort((a,b)=>b[1]-a[1]).slice(0,10);
console.log(sorted);
