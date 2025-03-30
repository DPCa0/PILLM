 
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

 
async function processFile(filePath) {
  try {
     
    const data = await readFileAsync(filePath, 'utf8');
    
     
    const words = data.split(/\s+/);
    const [firstWord, ...otherWords] = words;
    
    print(`First word: ${firstWord}`);
    
     
    const uniqueWords = [...new Set(otherWords)];
    
     
    const wordLengths = uniqueWords.map(word => word.length);
    
     
    await Promise.all(uniqueWords.map(async (word, index) => {
       
      await new Promise(resolve => setTimeout(resolve, 100));
      print(`Word: ${word}, Length: ${wordLengths[index]}`);
    }));
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
  }
}

 
(async () => {
  await processFile('./sample.txt');
})();
