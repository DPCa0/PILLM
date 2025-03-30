 
import fs from 'fs/promises';
import crypto from 'crypto';
import fetch from 'node-fetch';

 
async function fetchDataAndEncrypt() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();

     
    const jsonData = JSON.stringify(data);

     
    const encryptionKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

     
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);

     
    let encrypted = cipher.update(jsonData, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');

     
    const encryptedData = { iv: iv.toString('hex'), encrypted, tag };
    await fs.writeFile('encryptedData.json', JSON.stringify(encryptedData));

    print('Data fetched, encrypted, and saved successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
fetchDataAndEncrypt();
