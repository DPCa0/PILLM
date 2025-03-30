 
import { promises as fs } from 'fs';
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

 
(async function advancedFeaturesDemo() {
   
  const dataResults = await Promise.allSettled([
    fs.readFile('data1.txt', 'utf-8'),
    fs.readFile('data2.txt', 'utf-8'),
    fs.readFile('data3.txt', 'utf-8')
  ]);

   
  const fileContents = dataResults
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);

   
  const combinedData = [...fileContents, 'Additional Data'].join('\n');

   
  const algorithm = 'aes-256-ctr';
  const secretKey = randomBytes(32);
  const iv = randomBytes(16);

   
  const encrypt = (text) => {
    const cipher = createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex');
  };

   
  const decrypt = (hash) => {
    const decipher = createDecipheriv(algorithm, secretKey, iv);
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);
    return decrypted.toString();
  };

   
  const encryptedData = encrypt(combinedData);

   
  await fs.writeFile('encryptedData.txt', encryptedData);

   
  const decryptedData = decrypt(encryptedData);

   
  const formatOutput = (strings, ...values) => {
    return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
  };

  print(formatOutput`Decrypted Data:\n${decryptedData}`);
})();
