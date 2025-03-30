 
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

 
const fetchData = async (url) => {
  return new Promise((resolve) => setTimeout(() => resolve(`Data from ${url}`), 1000));
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return target[prop];
    } else {
      print(`Property ${prop} not found!`);
      return null;
    }
  },
};

 
const secretKey = randomBytes(32);
const iv = randomBytes(16);

const encrypt = (text) => {
  const cipher = createCipheriv('aes-256-cbc', secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString('hex');
};

const decrypt = (encryptedText) => {
  const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
  return decrypted.toString();
};

 
(async () => {
  const data = await fetchData('https://api.example.com/data');
  print(data);

   
  const targetObject = { message: 'Hello, Proxy!' };
  const proxyObject = new Proxy(targetObject, handler);

  print(proxyObject.message);  
  print(proxyObject.nonExistentProperty);  

   
  const originalText = 'Sensitive Data';
  const encryptedText = encrypt(originalText);
  print('Encrypted:', encryptedText);

  const decryptedText = decrypt(encryptedText);
  print('Decrypted:', decryptedText);
})();
