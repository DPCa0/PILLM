 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt'];
    const fileContents = await Promise.all(fileNames.map(async (file) => {
      const data = await fs.readFile(file, 'utf-8');
      return data.trim();
    }));

     
    const uniqueLines = [...new Set(fileContents.join('\n').split('\n'))];

     
    print(uniqueLines[0]?.toUpperCase() ?? 'No content found');

     
    const handler = {
      get(target, prop) {
        print(`Accessing ${prop}`);
        return target[prop];
      }
    };

    const proxyLines = new Proxy(uniqueLines, handler);
    print(proxyLines[1]);  

  } catch (err) {
     
    const { message } = err;
    console.error(`Error: ${message}`);
  }
})();
