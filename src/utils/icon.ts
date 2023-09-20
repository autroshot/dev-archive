import { promises as fs, statSync } from 'node:fs';

function createIconPack(packName: string) {
  return async (iconName: string) => {
    const path = `src/icons/${packName}/${iconName}.svg`;

    if (!isFileExist(path)) {
      throw new Error(
        `[astro-icon] Unable to load "${path}"! Does the file exist?"`,
      );
    }

    const SVGString = await fs.readFile(path).then((res) => res.toString());
    return SVGString;
  };

  function isFileExist(path: string): boolean {
    try {
      return statSync(path).isFile();
    } catch (e) {}
    return false;
  }
}

export { createIconPack };
