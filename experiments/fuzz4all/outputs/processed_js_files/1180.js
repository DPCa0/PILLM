 
import { promises as fs } from 'fs';
import crypto from 'crypto';
import { pipeline } from 'stream/promises';

 
async function hashData(data) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    resolve(hash.digest('hex'));
  });
}

 
async function processFile(inputPath, outputPath) {
  try {
    const inputData = await fs.readFile(inputPath, 'utf-8');
    const hashedData = await hashData(inputData);

    const readable = fs.createReadStream(inputPath);
    const writable = fs.createWriteStream(outputPath);

    await pipeline(
      readable,
      async function* (source) {
        for await (const chunk of source) {
           
          yield `${chunk}\nHash: ${hashedData}`;
        }
      },
      writable
    );

    print(`File processed and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

 
processFile('input.txt', 'output.txt');
