import fs from 'fs';
import path from 'path';

export const getImages = (dir: string, fileList: string[] = []): string[] => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getImages(filePath, fileList);
        } else if (/\.(jpg|jpeg|png|gif|webp)$/.test(file)) {
            fileList.push(filePath.replace(/\\/g, '/').replace('public/', ''));
        }
    });
    return fileList;
};