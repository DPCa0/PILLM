 
import { promises as fs } from 'fs';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';

 
(async () => {
   
  const dynamicKey = 'world';
  const complexObj = {
    hello: `Hello, ${dynamicKey}!`,
    [dynamicKey]: 'Using dynamic property!'
  };

   
  const filePath = 'greeting.txt';
  await fs.writeFile(filePath, complexObj.hello);

   
  await pipeline(
    createReadStream(filePath),
    zlib.createGzip(),
    createWriteStream(`${filePath}.gz`)
  );

  print('File compressed successfully');

   
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop];
      }
      return `Property ${prop} not found`;
    }
  };

  const proxiedObj = new Proxy(complexObj, handler);
  print(proxiedObj.hello);  
  print(proxiedObj.goodbye);  

   
  const uniqueNumbers = new Set([1, 2, 3, 4]);
  uniqueNumbers.add(2);  
  print([...uniqueNumbers]);

   
  function* numberGenerator(...numbers) {
    for (const num of numbers) {
      yield num * num;
    }
  }

   
  for (const squared of numberGenerator(1, 2, 3, 4)) {
    print(squared);
  }

   
  await fs.unlink(filePath);
  await fs.unlink(`${filePath}.gz`);
})();
