 
import { createInterface } from 'readline';
import { promises as fs } from 'fs';

 
async function processFile(filePath) {
  try {
     
    const fileStream = await fs.open(filePath, 'r');

     
    const rl = createInterface({
      input: fileStream.createReadStream(),
      crlfDelay: Infinity
    });

     
    const words = new Set();

     
    for await (const line of rl) {
       
      line.split(/\W+/).forEach(word => words.add(word.toLowerCase()));
    }

     
    await fileStream.close();

     
    print(`Unique words: ${[...words].join(', ')}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

 
(async () => {
  try {
    const filePath = './sample.txt';
    await processFile(filePath);
  } catch (err) {
    console.error(`Failed to process the file: ${err.message}`);
  }
})();
