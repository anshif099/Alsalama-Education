const fs = require('fs');
const { PNG } = require('pngjs');

fs.createReadStream('src/assets/alsalama-logo.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const colors = {};
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx+1];
        const b = this.data[idx+2];
        const a = this.data[idx+3];
        
        if (a > 10) {
          if (r > 240 && g > 240 && b > 240) continue;
          if (r < 15 && g < 15 && b < 15) continue;
          
          // group into small bins to find rough dominant colors
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
  });
