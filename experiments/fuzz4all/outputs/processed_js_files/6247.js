 
import { promises as fs } from 'fs';
import crypto from 'crypto';

 
(async () => {
  try {
     
    const randomData = crypto.randomBytes(256).toString('hex');
    
     
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(randomData, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    
     
    await fs.writeFile('encryptedData.txt', encryptedData, 'utf8');
    
     
    const dataFromFile = await fs.readFile('encryptedData.txt', 'utf8');
    
     
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decryptedData = decipher.update(dataFromFile, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    
     
    print('Original Data:', randomData);
    print('Encrypted Data:', encryptedData);
    print('Decrypted Data:', decryptedData);
  } catch (err) {
    console.error('Error:', err);
  }
})();
