 
import { readFile } from 'fs/promises';

 
const processFile = async (filePath) => {
  try {
     
    const fileData = await readFile(filePath, { encoding: 'utf8' });
    const { length } = fileData;

     
    const logHandler = {
      get: (target, prop) => {
        if (prop === 'log') {
          return () => print('File Length:', target.length);
        }
      }
    };

     
    const fileProxy = new Proxy({ length }, logHandler);
    fileProxy.log();

     
    function* charCounter(str) {
      for (let char of str) {
        yield char;
      }
    }

     
    const charCount = charCounter(fileData);
    let count = 0;
    for (let char of charCount) {
      count++;
    }

     
    const uniqueChars = new Set(fileData);
    print(`Unique Characters Count: ${uniqueChars.size}`);
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

 
(async () => {
  const filePath = './example.txt';  
  await processFile(filePath);
})();
