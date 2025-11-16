import fs from 'node:fs';
import path from 'node:path';

/**
 * @param outputDir – the output directory
 * @returns string[]
 * @description A basic method that will retrieve the token lists paths excluding the index.
 */
export default function getPaths(outputDir: string) {
  return fs.readdirSync(outputDir, {recursive: true}).map(item => item.toString()).filter((p) => {
    try {
      return fs.statSync(path.join(outputDir, p.toString())).isFile();
    } catch (e) {
      console.error(e);
      return false;
    }
  });
}
