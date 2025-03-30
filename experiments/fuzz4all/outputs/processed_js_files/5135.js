 
import { promises as fs } from 'fs';
import path from 'path';

 
(async () => {
   
  const dirPath = path.resolve('./data');

   
  async function* getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        yield* getFiles(res);
      } else {
        yield res;
      }
    }
  }

   
  const filterFilesByExtension = (extension) => async function* (fileGenerator) {
    for await (const file of fileGenerator) {
      if (file.endsWith(extension)) {
        yield file;
      }
    }
  };

   
  const filesWithExtension = filterFilesByExtension('.js');
  const files = filesWithExtension(getFiles(dirPath));

   
  const tasks = [];
  for await (const file of files) {
    tasks.push(
      (async () => {
        const content = await fs.readFile(file, 'utf-8');
        print(`\nFile: ${file}`);
        print(content);
      })()
    );
  }
  
   
  await Promise.all(tasks);
})();
