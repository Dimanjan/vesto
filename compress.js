const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rawDir = path.join(__dirname, 'raw_images');
const imgsDir = path.join(__dirname, 'imgs');

// Create directories if they don't exist
if (!fs.existsSync(rawDir)) fs.mkdirSync(rawDir);
if (!fs.existsSync(imgsDir)) fs.mkdirSync(imgsDir);

fs.readdir(rawDir, (err, files) => {
    if (err) {
        console.error('Error reading raw_images directory:', err);
        return;
    }

    files.forEach(file => {
        // Skip hidden files
        if (file.startsWith('.')) return;

        const inputPath = path.join(rawDir, file);
        // Change extension to .jpg
        const outputFilename = path.parse(file).name + '.jpg';
        const outputPath = path.join(imgsDir, outputFilename);

        sharp(inputPath)
            .jpeg({ quality: 80, progressive: true })
            .toFile(outputPath)
            .then(info => {
                console.log(`Compressed: ${file} -> ${outputFilename}`);
            })
            .catch(err => {
                console.error(`Error compressing ${file}:`, err);
            });
    });
});
