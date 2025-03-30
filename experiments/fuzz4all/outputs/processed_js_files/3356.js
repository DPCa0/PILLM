 
import { promises as fs } from 'fs';
import crypto from 'crypto';

 
(async () => {
  try {
     
    let data = await fs.readFile('data.txt', 'utf-8');

     
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

     
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

     
    print('Encrypted Data:', encrypted);

     
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

     
    print('Decrypted Data:', decrypted);

     
    const results = await Promise.all([
      fs.writeFile('encrypted.txt', encrypted),
      fs.writeFile('decrypted.txt', decrypted),
    ]);

    print('Files written successfully:', results);
  } catch (error) {
    console.error('Error:', error);
  }
})();
