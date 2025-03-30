 
const { promises: fs } = require('fs');
const { randomBytes, createCipheriv } = require('crypto');

 
(async () => {
   
  const fileHandler = {
    async set(target, prop, value) {
      print(`Writing to file: ${prop}`);
      await fs.writeFile(prop, value);
      return true;
    }
  };

   
  const fileTarget = {};
  const fileProxy = new Proxy(fileTarget, fileHandler);

   
  async function writeEncryptedMessage(fileName, message) {
    const algorithm = 'aes-256-cbc';
    const key = randomBytes(32);  
    const iv = randomBytes(16);  

     
    const cipher = createCipheriv(algorithm, key, iv);
    let encryptedMessage = cipher.update(message, 'utf-8', 'hex');
    encryptedMessage += cipher.final('hex');

     
    await fs.writeFile('key.txt', key.toString('hex'));
    await fs.writeFile('iv.txt', iv.toString('hex'));
    fileProxy[fileName] = encryptedMessage;
  }

   
  try {
    await writeEncryptedMessage('encryptedMessage.txt', 'Hello, world!');
    print('Encrypted message written successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
