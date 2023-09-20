import { promises as fs, statSync } from 'node:fs';
import nodePath from 'node:path';

export default async function iconPack(name: string) {
  const dirName = nodePath.parse(import.meta.url).name;
  const path = `src/icons/${dirName}/${name}.svg`;

  if (!isFileExist(path)) {
    throw new Error(
      `[astro-icon] Unable to load "${path}"! Does the file exist?"`,
    );
  }

  const SVGString = await fs.readFile(path).then((res) => res.toString());
  return SVGString;
}

function isFileExist(path: string): boolean {
  try {
    return statSync(path).isFile();
  } catch (e) {}
  return false;
}
