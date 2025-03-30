 
import { promises as fs } from 'fs';
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

 
(async () => {
  const algorithm = 'aes-256-cbc';
  const password = 'supersecretpassword';

   
  const key = randomBytes(32);
  const iv = randomBytes(16);

   
  const encryptText = (text) => {
    const cipher = createCipheriv(algorithm, key, iv);
    return Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]).toString('hex');
  };

   
  const decryptText = (encryptedText) => {
    const decipher = createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  };

   
  const originalText = 'Hello, world! Advanced JavaScript is awesome!';
  
   
  const encryptedText = encryptText(originalText);

   
  const decryptedText = decryptText(encryptedText);

   
  print(`Original Text: ${originalText}`);
  print(`Encrypted Text: ${encryptedText}`);
  print(`Decrypted Text: ${decryptedText}`);

   
  const [filename] = './output.txt'.split('/').reverse();

   
  try {
    await fs.writeFile(`./${filename}`, `Original: ${originalText}\nEncrypted: ${encryptedText}\nDecrypted: ${decryptedText}`);
    print(`Results written to ${filename}`);
  } catch (err) {
    console.error('Error writing to file', err);
  }
})();
