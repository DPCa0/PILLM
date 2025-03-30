 
import { promises as fs } from 'fs';
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

 
async function complexOperation() {
  const secretMessage = "Hello, advanced JavaScript world!";
  const algorithm = 'aes-256-cbc';
  const key = randomBytes(32);  
  const iv = randomBytes(16);   

   
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(secretMessage, 'utf8', 'hex');
  encrypted += cipher.final('hex');

   
  await fs.writeFile('encryptedMessage.txt', encrypted);

   
  const encryptedMessage = await fs.readFile('encryptedMessage.txt', 'utf8');

   
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

   
  print("Original Message:", secretMessage);
  print("Encrypted Message:", encryptedMessage);
  print("Decrypted Message:", decrypted);
}

 
complexOperation().catch(err => console.error("Error:", err));
