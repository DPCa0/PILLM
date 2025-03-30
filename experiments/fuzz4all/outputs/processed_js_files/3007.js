 
import fs from 'fs/promises';
import { promisify } from 'util';
import crypto from 'crypto';

 
const delay = promisify(setTimeout);

 
async function generateRandomString() {
  const randomBytes = promisify(crypto.randomBytes);
  const buffer = await randomBytes(8);
  return buffer.toString('hex');
}

 
async function performComplexOperations() {
  try {
     
    await delay(Math.random() * 2000 + 1000);

     
    const randomString = await generateRandomString();
    print(`Generated Random String: ${randomString}`);

     
    await fs.writeFile('randomString.txt', randomString);
    print('Random string written to file.');

     
    const fileContent = await fs.readFile('randomString.txt', 'utf-8');
    print(`Read from file: ${fileContent}`);

  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

 
(async () => {
  print('Starting complex operations...');
  await performComplexOperations();
  print('Complex operations completed.');
})();
