 
import readline from 'node:readline/promises';
import { open } from 'node:fs/promises';
import crypto from 'node:crypto';

 
async function encryptText(text, password) {
  const algorithm = 'aes-256-ctr';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, crypto.scryptSync(password, 'salt', 32), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
}

 
async function decryptText(encrypted, password) {
  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    crypto.scryptSync(password, 'salt', 32),
    Buffer.from(encrypted.iv, 'hex')
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted.content, 'hex')),
    decipher.final()
  ]);
  return decrypted.toString();
}

 
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const inputText = await rl.question('Enter the text to encrypt: ');
    const password = await rl.question('Enter a password: ', { hideEchoBack: true });
    const encrypted = await encryptText(inputText, password);

    print(`\nEncrypted data: ${JSON.stringify(encrypted)}`);
    
    const confirmation = await rl.question('\nDo you want to decrypt the text? (y/n): ');
    if (confirmation.toLowerCase() === 'y') {
      const decrypted = await decryptText(encrypted, password);
      print(`\nDecrypted text: ${decrypted}`);
    }

    const file = await open('encrypted.txt', 'w');
    await file.writeFile(JSON.stringify(encrypted));
    await file.close();
    print('\nEncrypted data saved to encrypted.txt');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
}

main();
