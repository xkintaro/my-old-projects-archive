const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '..', '..', process.env.VITE_UPLOAD_DIR || 'uploads');
const THUMBNAILS_DIR = path.join(__dirname, '..', '..', process.env.VITE_THUMBNAILS_DIR || 'thumbnails');
const USER_PROFILES_DIR = path.join(__dirname, '..', '..', process.env.USER_PROFILES_DIR || 'user-profiles');
const SERVER_IMAGE_DIR = path.join(__dirname, '..', '..', process.env.SERVER_IMAGE_DIR || 'server-images');

[UPLOAD_DIR, THUMBNAILS_DIR, USER_PROFILES_DIR, SERVER_IMAGE_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📂 Klasör oluşturuldu: ${dir}`);
    }
});

module.exports = {
    UPLOAD_DIR,
    THUMBNAILS_DIR,
    USER_PROFILES_DIR,
    SERVER_IMAGE_DIR
};
