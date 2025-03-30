 
const fs = require('fs');
const crypto = require('crypto');

 
const readAndHashFile = async (filePath) => {
  try {
    const { promises: { readFile } } = fs;
    const data = await readFile(filePath, 'utf-8');

     
    const hash = crypto.createHash('sha256').update(...[data]).digest('hex');
    print(`Hash of the file content is: ${hash}`);
    
    return hash;
  } catch (error) {
    console.error('Error reading or hashing file:', error);
  }
};

 
const handler = {
  apply: (target, thisArg, argumentsList) => {
    print(`Called with arguments: ${argumentsList}`);
    return target(...argumentsList);
  }
};

const proxiedFunction = new Proxy(readAndHashFile, handler);

 
(async () => {
  const filePath = 'example.txt';  
  await proxiedFunction(filePath);
})();
