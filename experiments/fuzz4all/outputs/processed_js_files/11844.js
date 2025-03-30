 
import { promises as fs } from 'fs';
import { createHash } from 'crypto';

 
async function main() {
  try {
     
    const [file1, file2] = await Promise.all([
      fs.readFile('file1.txt', 'utf-8'),
      fs.readFile('file2.txt', 'utf-8')
    ]);

     
    const wordCountMap = [file1, file2].flatMap(text => text.split(/\s+/))
      .reduce((map, word) => map.set(word, (map.get(word) || 0) + 1), new Map());

     
    print('Word Count:', Object.fromEntries(wordCountMap));

     
    const hashStream = (file) => new Promise((resolve, reject) => {
      const hash = createHash('sha256');
      fs.createReadStream(file)
        .on('data', data => hash.update(data))
        .on('end', () => resolve(hash.digest('hex')))
        .on('error', reject);
    });

    const [hash1, hash2] = await Promise.all([
      hashStream('file1.txt'),
      hashStream('file2.txt')
    ]);

    print('File1 Hash:', hash1);
    print('File2 Hash:', hash2);

     
    const [result1, result2] = [hash1, hash2].map(hash => `SHA256 Hash: ${hash}`);
    print(result1, result2);

  } catch (error) {
     
    console.error('An error occurred:', error);
  }
}

 
(async () => {
  await main();
})();
