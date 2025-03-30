 
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

 
const generateIV = () => randomBytes(16);

 
const encryptMessage = (message, secretKey) => {
  const iv = generateIV();
  const cipher = createCipheriv('aes-256-ctr', Buffer.from(secretKey, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

 
const decryptMessage = (encryptedMessage, secretKey) => {
  const [ivHex, encryptedHex] = encryptedMessage.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const decipher = createDecipheriv('aes-256-ctr', Buffer.from(secretKey, 'hex'), iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
};

 
const main = async () => {
  const secretKey = randomBytes(32).toString('hex');
  const message = 'Advanced JavaScript is fascinating!';

   
  const encryptedMessage = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(encryptMessage(message, secretKey));
    }, 1000);
  });

  print('Encrypted Message:', encryptedMessage);

   
  const decryptedMessage = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(decryptMessage(encryptedMessage, secretKey));
    }, 1000);
  });

  print('Decrypted Message:', decryptedMessage);
};

main().catch(console.error);
