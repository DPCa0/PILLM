 
import { promises as fsPromises } from 'fs';
import path from 'path';

 
async function readFilesInDirectory(directory) {
  const dir = path.resolve(directory);
  try {
    const files = await fsPromises.readdir(dir);
    const fileContents = await Promise.all(
      files.map(file => fsPromises.readFile(path.join(dir, file), 'utf-8'))
    );
     
    fileContents.forEach((content, index) => {
      print(`\n=== Content of ${files[index]} ===\n${content}`);
    });
  } catch (error) {
    console.error(`Error reading directory ${directory}: ${error.message}`);
  }
}

 
(async () => {
  const targetDirectory = './exampleDir';  
  await readFilesInDirectory(targetDirectory);

   
  const set = new Set([1, 2, 3, 3, 4, 5]);
  const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

  print('Set:', [...set]);
  print('Map:', [...map]);

   
  const [, second, ...rest] = [...set];
  print('Second:', second);
  print('Rest:', rest);
})();
