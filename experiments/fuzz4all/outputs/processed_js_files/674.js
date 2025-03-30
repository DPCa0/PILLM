 
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import crypto from 'crypto';

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Sensitive Data: JavaScript Rocks!'), 1000);
  });
}

 
async function processData() {
  const data = await fetchData();
  
   
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  
   
  const filePath = resolve('encryptedData.txt');
  writeFileSync(filePath, `Encrypted Data: ${encrypted}`);
  
   
  const [encryptedData] = readFileSync(filePath, 'utf-8').match(/(?<=Encrypted Data: ).*/);
  
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  
  print(`Decrypted Data: ${decrypted}`);
}

 
processData().catch(console.error);
