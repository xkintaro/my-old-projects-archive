const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const outputFile = path.join(rootDir, 'aggregate_files.txt');
const scriptFile = path.basename(__filename);

const ignoredDirs = [
    'node_modules',
    '.git',
    '.next',
    '.vscode',
    '.idea',
    'dist',
    'build',
    'coverage',
    'public',
    '.gemini',
    'generated'
];

const ignoredFiles = [
    'tsconfig.tsbuildinfo',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'aggregate_files.txt',
    'aggregate_files.js',
    outputFile,
    scriptFile,
    '.DS_Store',
    '.gitignore',
    '.env.local',
    '.env.development',
    '.env.test',
    '.env.production',
    'README.md'
];

const binaryExtensions = [
    '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.webm', '.mp3', '.pdf', '.zip', '.tar', '.gz', '.7z', '.rar', '.exe', '.dll', '.so', '.dylib', '.bin', '.db', '.sqlite'
];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            if (!ignoredDirs.includes(file)) {
                arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (!ignoredFiles.includes(file) && !binaryExtensions.includes(ext)) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

try {
    console.log('Dosyalar taranıyor...');
    const allFiles = getAllFiles(rootDir);

    console.log(`${allFiles.length} dosya bulundu. ${outputFile} dosyasına yazılıyor...`);

    const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

    allFiles.forEach(file => {
        const relativePath = path.relative(rootDir, file);
        const fileContent = fs.readFileSync(file, 'utf8');

        writeStream.write(`\n================================================================================\n`);
        writeStream.write(`FILE PATH: ${relativePath}\n`);
        writeStream.write(`================================================================================\n\n`);
        writeStream.write(fileContent);
        writeStream.write(`\n\n`);
    });

    writeStream.end();

    writeStream.on('finish', () => {
        console.log(`İşlem tamamlandı! ${outputFile} oluşturuldu.`);
    });

} catch (err) {
    console.error('Bir hata oluştu:', err);
}
