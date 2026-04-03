import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUTHORS_DIR = path.join(__dirname, '../public/images/authors');

async function optimizeImages() {
  try {
    const files = fs.readdirSync(AUTHORS_DIR);
    const pngFiles = files.filter(f => f.endsWith('.png'));

    console.log(`Found ${pngFiles.length} PNG files to optimize...`);

    for (const file of pngFiles) {
      const inputPath = path.join(AUTHORS_DIR, file);
      const outputPath = path.join(AUTHORS_DIR, file.replace('.png', '.webp'));

      console.log(`Optimizing ${file} -> ${path.basename(outputPath)}`);

      await sharp(inputPath)
        .resize(160, 160, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      // Delete the original PNG to save space and prevent accidental usage
      fs.unlinkSync(inputPath);
    }

    console.log('Successfully optimized all author images!');
  } catch (err) {
    console.error('Error during optimization:', err);
    process.exit(1);
  }
}

optimizeImages();
