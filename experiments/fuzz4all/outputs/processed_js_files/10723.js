 
import fs from 'fs';
import readline from 'readline';
import { promisify } from 'util';

 
const delay = promisify(setTimeout);

 
async function readAndPrintFile(filePath) {
   
  const fileStream = fs.createReadStream(filePath);

   
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

   
  for await (const line of rl) {
    print(line);
    await delay(500);  
  }
}

 
(async () => {
  try {
     
    const config = {
      filePath: 'example.txt',
      delay: 500
    };

    const handler = {
      get: (target, prop, receiver) => {
        if (prop === 'filePath') {
          print(`Accessing the filePath: ${Reflect.get(target, prop, receiver)}`);
        }
        return Reflect.get(target, prop, receiver);
      }
    };

    const proxiedConfig = new Proxy(config, handler);

     
    await readAndPrintFile(proxiedConfig.filePath);

  } catch (err) {
    console.error('Error:', err);
  }
})();

Note: This script assumes the presence of a file named `example.txt`. It reads and logs each line with a delay while demonstrating async operations, promises, and proxies.