 
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
 
import { promises as fs } from 'fs';

 
(async () => {
  const algorithm = 'aes-256-cbc';  
  const key = randomBytes(32);      
  const iv = randomBytes(16);       

   
  const encrypt = (text) => {
    const cipher = createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return encrypted.toString('hex');
  };

   
  const decrypt = (encryptedText) => {
    const decipher = createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
    return decrypted.toString('utf8');
  };

  const secretMessage = 'Hello, advanced JavaScript!';
  const encryptedMessage = encrypt(secretMessage);
  const decryptedMessage = decrypt(encryptedMessage);

  print('Original:', secretMessage);
  print('Encrypted:', encryptedMessage);
  print('Decrypted:', decryptedMessage);

   
  await fs.writeFile('secret.txt', encryptedMessage);
  print('Encrypted message saved to secret.txt');

   
  const readMessage = await fs.readFile('secret.txt', 'utf8');
  print('Read from file and decrypted:', decrypt(readMessage));
})();
