#!/usr/bin/env node

/**
 * Simple script to help generate raster tiles from an image
 * This is a helper script - you'll need to install GDAL or use MapTiler Desktop
 */

const fs = require('fs');
const path = require('path');

const imagePath = process.argv[2];
const outputDir = process.argv[3] || './public/tiles';

if (!imagePath) {
    console.log(`
Usage: node scripts/generate-tiles.js <image-path> [output-directory]

Example:
  node scripts/generate-tiles.js public/images/DHA/FotoJet.png public/tiles

This script will help you set up tile generation.
You'll need to install GDAL or use MapTiler Desktop to actually generate tiles.

Methods to generate tiles:

1. GDAL2Tiles (Command Line):
   - Install GDAL: https://gdal.org/download.html
   - Run: gdal2tiles.py -z 14-20 ${imagePath} ${outputDir}

2. MapTiler Desktop (GUI):
   - Download: https://www.maptiler.com/desktop/
   - Open your image and export as tiles

3. Online Tools:
   - MapTiler Cloud
   - QGIS with GDAL plugin
`);
    process.exit(1);
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created directory: ${outputDir}`);
}

console.log(`
Tile Generation Setup:
=====================

Image: ${imagePath}
Output: ${outputDir}

Next Steps:
1. Install GDAL or MapTiler Desktop
2. Generate tiles using one of the methods above
3. Test with: http://localhost:3000/map/raster-test

GDAL Command:
gdal2tiles.py -z 14-20 "${imagePath}" "${outputDir}"
`);

// Create a simple test HTML file to verify tiles
const testHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Tile Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .tile-test { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
        img { max-width: 100%; height: auto; }
    </style>
</head>
<body>
    <h1>Tile Generation Test</h1>
    <p>If tiles are generated correctly, you should see images below:</p>
    
    <div class="tile-test">
        <h3>Zoom Level 14, Tile 0,0</h3>
        <img src="./14/0/0.png" alt="Tile 14/0/0" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div style="display:none; color:red;">Tile not found: ./14/0/0.png</div>
    </div>
    
    <div class="tile-test">
        <h3>Zoom Level 15, Tile 0,0</h3>
        <img src="./15/0/0.png" alt="Tile 15/0/0" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div style="display:none; color:red;">Tile not found: ./15/0/0.png</div>
    </div>
    
    <p><strong>Note:</strong> This is just a test file. The actual tiles will be used by Mapbox.</p>
</body>
</html>
`;

fs.writeFileSync(path.join(outputDir, 'test.html'), testHtml);
console.log(`Created test file: ${path.join(outputDir, 'test.html')}`);
