 
import fs from 'fs/promises';

 
async function readAndProcessFile(filePath) {
  try {
     
    const data = await fs.readFile(filePath, 'utf-8');

     
    const uniqueWords = new Set(data.split(/\W+/));

     
    const processedWords = Array.from(uniqueWords)
      .filter(word => word.length > 4)
      .map(word => word.toUpperCase());

     
    const [first, second, third, fourth, fifth] = processedWords;

     
    print(`First five processed words: ${first}, ${second}, ${third}, ${fourth}, ${fifth}`);
  } catch (err) {
     
    console.error('Error reading or processing file:', err);
  }
}

 
(async () => {
   
  const filePath = process.env?.FILE_PATH ?? 'example.txt';
  
   
  await readAndProcessFile(filePath);
})();
