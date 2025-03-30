 
import { promises as fs } from 'fs';

 
async function complexFeaturesDemo() {
  try {
     
    const uniqueWords = new Set();
    const wordMap = new Map();

     
    const data = await fs.readFile('sample.txt', 'utf8');

     
    data.split(/\W+/).forEach(word => {
      word = word.toLowerCase();
      if (word) {
        uniqueWords.add(word);
        wordMap.set(word, (wordMap.get(word) || 0) + 1);
      }
    });

     
    const [mostFrequentWord] = [...wordMap.entries()].sort((a, b) => b[1] - a[1]);

     
    function* iterateWords() {
      for (const word of uniqueWords) {
        yield word;
      }
    }

     
    for (const word of iterateWords()) {
      print(`Word: ${word}`);
    }

     
    const result = {
      uniqueWordCount: uniqueWords.size,
      mostFrequentWord: mostFrequentWord?.[0] ?? 'No word found',
    };

    print(`Unique words: ${result.uniqueWordCount}`);
    print(`Most frequent word: ${result.mostFrequentWord}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

complexFeaturesDemo();
