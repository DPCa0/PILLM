 
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

 
class SecureMessage {
  constructor(plainText) {
    this.algorithm = 'aes-256-cbc';
    this.key = randomBytes(32);
    this.iv = randomBytes(16);
    this.encryptedMessage = this.encrypt(plainText);
  }

   
  encrypt = (text) => {
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt = () => {
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(this.encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  static async simulateAsyncOperation() {
     
    return new Promise((resolve) => {
      setTimeout(() => resolve('Asynchronous operation complete!'), 2000);
    });
  }
}

 
const handler = {
  get: (target, prop) => {
    return prop in target ? target[prop] : `Property ${prop} does not exist`;
  }
};

 
(async () => {
  const secureMessage = new SecureMessage("Hello, world!");
  const secureProxy = new Proxy(secureMessage, handler);

  print(`Encrypted: ${secureProxy.encryptedMessage}`);
  print(`Decrypted: ${secureProxy.decrypt()}`);
  
   
  const asyncMessage = await SecureMessage.simulateAsyncOperation();
  print(asyncMessage);
})();
