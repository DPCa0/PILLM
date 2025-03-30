 
const fs = require('fs').promises;
const crypto = require('crypto');

 
(async () => {
  try {
     
    const encrypt = (text) => {
      const algorithm = 'aes-256-ctr';
      const secretKey = crypto.randomBytes(32);
      const iv = crypto.randomBytes(16);

      const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

      const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
      return `${iv.toString('hex')}.${encrypted.toString('hex')}.${secretKey.toString('hex')}`;
    };

     
    const maskText = (strings, ...values) => {
      return strings.map((str, index) => `${str}${'*'.repeat(values[index] ? values[index].length : 0)}`).join('');
    };

    const sensitiveText = 'SuperSecretPassword';
    const masked = maskText`Masked text: ${sensitiveText}`;
    print(masked);  

     
    const encryptedData = encrypt('Hello, world!');
    await fs.writeFile('encrypted.txt', encryptedData);
    print('Data encrypted and saved!');

     
    const data = await fs.readFile('encrypted.txt', 'utf8');
    print('Encrypted Data:', data);

     
    const [ivHex, encryptedHex, keyHex] = data.split('.');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const secretKey = Buffer.from(keyHex, 'hex');

     
    const decrypt = (iv, encryptedText, secretKey) => {
      const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, iv);
      const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
      return decrypted.toString();
    };

    const decryptedMessage = decrypt(iv, encryptedText, secretKey);
    print('Decrypted Message:', decryptedMessage);