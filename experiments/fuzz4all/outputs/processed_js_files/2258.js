 
import fs from 'fs/promises';
import crypto from 'crypto';

 
async function createAndHashFile({filename, content}) {
  await fs.writeFile(filename, content);
  const fileBuffer = await fs.readFile(filename);
  const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
  return hash;
}

 
(async () => {
  try {
    const filename = 'example.txt';
    const content = 'Hello, world!';

     
    const hash = await createAndHashFile({filename, content});
    print(`SHA-256 hash of the file is: ${hash ?? 'No hash available'}`);
    
     
    const target = {message: 'Hello, JavaScript!'};
    const handler = {
      get: (obj, prop) => prop in obj ? obj[prop] : 'Property does not exist'
    };
    const proxy = new Proxy(target, handler);

    print(proxy.message);   
    print(proxy.nonexistentProperty);  

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
