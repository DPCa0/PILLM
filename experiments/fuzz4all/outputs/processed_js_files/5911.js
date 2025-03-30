 
import { promises as fs } from 'fs';
import crypto from 'crypto';

 
const encryptFileContent = async (inputFile, outputFile, secretKey) => {
  try {
     
    const fileContent = await fs.readFile(inputFile, 'utf8');

     
    const iv = crypto.randomBytes(16);

     
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(secretKey), iv);

     
    let encryptedContent = cipher.update(fileContent, 'utf8', 'hex');
    encryptedContent += cipher.final('hex');

     
    const authTag = cipher.getAuthTag().toString('hex');

     
    const payload = {
      iv: iv.toString('hex'),
      content: encryptedContent,
      tag: authTag,
    };

     
    await fs.writeFile(outputFile, JSON.stringify(payload));

    print('File encrypted successfully');
  } catch (error) {
    console.error('Error during file encryption:', error);
  }
};

 
(async () => {
  const secretKey = crypto.randomBytes(32);  
  await encryptFileContent('sample.txt', 'encrypted.json', secretKey);
})();
