
const fs = require('fs');
const https = require('https');
const sharp = require('sharp');

// Create project_images directory if it doesn't exist
if (!fs.existsSync('project_images')) {
    fs.mkdirSync('project_images');
}

// List of Free License Image URLs (from Pexels)
const imageUrls = [
    "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
    "https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg",
    "https://images.pexels.com/photos/5872361/pexels-photo-5872361.jpeg",
    "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    "https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg",
    "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
    "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg",
    "https://images.pexels.com/photos/6408282/pexels-photo-6408282.jpeg"
];

function downloadImage(url, index) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            const chunks = [];
            
            response.on('data', (chunk) => {
                chunks.push(chunk);
            });
            
            response.on('end', () => {
                const buffer = Buffer.concat(chunks);
                
                // Resize image using sharp
                sharp(buffer)
                    .resize(800, null, { 
                        withoutEnlargement: true,
                        height: null,
                        fit: sharp.fit.contain
                    })
                    .toFile(`project_images/project_${index + 1}.jpg`)
                    .then(() => {
                        console.log(`Downloaded image ${index + 1}`);
                        resolve();
                    })
                    .catch(reject);
            });
        }).on('error', reject);
    });
}

async function downloadAllImages() {
    try {
        await Promise.all(imageUrls.map((url, index) => downloadImage(url, index)));
        console.log('All images downloaded successfully');
    } catch (error) {
        console.error('Error downloading images:', error);
    }
}

// Export for use in other files
module.exports = { downloadAllImages };

// Run if called directly
if (require.main === module) {
    downloadAllImages();
}
