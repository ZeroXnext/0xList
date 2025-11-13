import path from 'node:path';
import fs from 'node:fs';

function getUniqueFilePath(dirPath: string, baseName: string, ext = 'json'): string {
  let filePath = path.join(dirPath, `${baseName}.${ext}`);
  let counter = 1;

  while (fs.existsSync(filePath)) {
    filePath = path.join(dirPath, `${baseName}-${counter}.${ext}`);
    counter++;
  }

  return filePath;
}

export default getUniqueFilePath
