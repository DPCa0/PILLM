 
import fs from 'fs/promises';
import { createHash } from 'crypto';

 
async function hashFile(filePath) {
  try {
     
    const data = await fs.readFile(filePath);
    
     
    const hash = createHash('sha256');

     
    hash.update(data);

     
    const hex = hash.digest('hex');

     
    print(`SHA-256 hash of ${filePath}:`, hex);
    
     
    const hashProxy = new Proxy(hash, {
      get(target, prop) {
        print(`Accessed property: ${String(prop)}`);
        return target[prop];
      }
    });

     
    print('Hash object algorithm:', hashProxy.algorithm);

  } catch (error) {
    console.error('Error hashing file:', error);
  }
}

 
const filePath = './example.txt';  
hashFile(filePath);
