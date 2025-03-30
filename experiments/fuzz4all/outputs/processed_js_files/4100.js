 
const { promisify } = require('util');
const crypto = require('crypto');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

 
class CipherHandler {
  constructor() {
    this.algorithm = 'aes-192-cbc';
    this.password = 'supersecret';
    this.key = crypto.scryptSync(this.password, 'salt', 24);
    this.iv = crypto.randomBytes(16);
  }

  async encrypt(text) {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return { iv: this.iv.toString('hex'), content: encrypted.toString('hex') };
  }

  async decrypt(encryptedObject) {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(encryptedObject.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedObject.content, 'hex')), decipher.final()]);
    return decrypted.toString('utf8');
  }
}

 
const simulateAsync = async () => {
  const asyncFunction = async () => new Promise(resolve => setTimeout(() => resolve('Async Work Complete!'), 500));
  print(await asyncFunction());
};

 
(async () => {
  try {
    print('Starting encryption and decryption process...');
    
     
    const handler = new CipherHandler();
    
     
    const sampleText = 'This is some sensitive data!';
    
     
    const encryptedData = await handler.encrypt(sampleText);
    print('Encrypted:', encryptedData);
    
     
    await writeFileAsync('encryptedData.json', JSON.stringify(encryptedData, null, 2));
    
     
    const dataFromFile = await readFileAsync('encryptedData.json', 'utf8');
    const parsedData = JSON.parse(dataFromFile);
    
     
    const decryptedData = await handler.decrypt(parsedData);
    print('Decrypted:', decryptedData);

     
    await