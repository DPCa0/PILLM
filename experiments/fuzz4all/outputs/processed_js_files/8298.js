 
import { promises as fs } from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import zlib from 'zlib';

 
const pipe = promisify(pipeline);

 
async function compressFile(inputFile, outputFile) {
  try {
     
    const data = await fs.readFile(inputFile, 'utf-8');

     
    print('Original content:', data);

     
    const gzip = zlib.createGzip();

     
    await pipe(
      fs.createReadStream(inputFile),
      gzip,
      fs.createWriteStream(outputFile)
    );

    print('File compressed successfully.');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

 
compressFile('example.txt', 'example.txt.gz');
