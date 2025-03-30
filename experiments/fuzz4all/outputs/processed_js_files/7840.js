 
import { readFile } from 'node:fs/promises';

 
const processFile = async (filePath) => {
  try {
     
    const data = await readFile(filePath, 'utf8');
    
     
    const wordCount = data.split(/\s+/).reduce((countMap, word) => {
      word = word.toLowerCase().replace(/[.,?!]/g, '');
      countMap[word] = (countMap[word] || 0) + 1;
      return countMap;
    }, {});

     
    const sortedWords = Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a);

     
    sortedWords.slice(0, 5).forEach(([word, count]) => {
      print(`Word: ${word} - Count: ${count}`);
    });

  } catch (error) {
     
    console?.error('Error reading the file:', error);
  }
};

 
(async () => {
  const filePath = './text.txt';  
  await processFile(filePath);
})();
