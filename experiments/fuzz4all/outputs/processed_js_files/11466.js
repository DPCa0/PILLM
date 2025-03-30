 
import { promises as fs } from 'fs';
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

 
(async () => {
  const algorithm = 'aes-256-cbc';
  const password = 'super_secret_password';
  
   
  const key = Buffer.concat([Buffer.from(password), Buffer.alloc(32)], 32);
  const iv = randomBytes(16);

  const encrypt = (text) => {
    const cipher = createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
  };

  const decrypt = (hash) => {
    const decipher = createDecipheriv(algorithm, key, Buffer.from(hash.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrypted.toString();
  };

  const message = 'Hello, world! Advanced JavaScript in action!';
  const encryptedMessage = encrypt(message);

   
  await fs.writeFile('encryptedMessage.json', JSON.stringify(encryptedMessage));

   
  const data = await fs.readFile('encryptedMessage.json');
  const savedMessage = JSON.parse(data);

   
  const decryptedMessage = decrypt(savedMessage);
  print('Decrypted Message:', decryptedMessage);
})();
