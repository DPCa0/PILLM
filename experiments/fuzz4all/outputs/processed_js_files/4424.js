 
const fs = require('fs').promises;
const crypto = require('crypto');

 
async function encryptFile(inputFilePath, outputFilePath, secretKey) {
  try {
     
    const data = await fs.readFile(inputFilePath, 'utf8');

     
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);

     
    const encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

     
    await fs.writeFile(outputFilePath, Buffer.concat([iv, encryptedData]));

    print('File encrypted successfully.');
  } catch (error) {
    console.error('Error encrypting file:', error);
  }
}

 
(async function() {
  const secretKey = crypto.randomBytes(32).toString('hex');  
  const inputFilePath = 'input.txt';  
  const outputFilePath = 'encrypted.txt';  

   
  await encryptFile(inputFilePath, outputFilePath, secretKey);
})();
