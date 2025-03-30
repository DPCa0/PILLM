 
import { readFile } from 'node:fs/promises';

 
(async () => {
  try {
     
    const data = await readFile('example.txt', 'utf8');

     
    const uniqueWords = [...new Set(data.split(/\W+/))];
    const wordCounts = uniqueWords.map(word => ({
      word,
      count: (data.match(new RegExp(`\\b${word}\\b`, 'gi')) || []).length
    }));

     
    const mostFrequent = wordCounts.reduce((max, current) => {
      return (current.count > max?.count ?? 0) ? current : max;
    }, { word: null, count: 0 });

     
    print(`Most frequent word: '${mostFrequent.word}' occurs ${mostFrequent.count} times`);
  } catch (error) {
     
    console.error('An error occurred:', error?.message ?? error);
  }
})();
