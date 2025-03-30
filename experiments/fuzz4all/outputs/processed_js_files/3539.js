 
import { promises as fs } from 'fs';

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function manipulateFiles() {
    try {
         
        const data = await fs.readFile('./input.txt', 'utf-8');
        print('Original Data:', data);
        
         
        const words = data.split(/\W+/);
        const uniqueWordsSet = new Set(words);
        const wordCountMap = new Map();
        
        uniqueWordsSet.forEach(word => {
            const count = words.filter(w => w === word).length;
            wordCountMap.set(word, count);
        });

         
        const result = Array.from(wordCountMap.entries())
                            .map(([word, count]) => ({ word, count }))
                            .sort((a, b) => b.count - a.count);

        const resultJson = JSON.stringify(result, null, 2);
        print('Processed Data:', resultJson);

         
        await delay(500);

         
        await fs.writeFile('./output.json', resultJson);
        print('Data written to output.json');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

 
(async () => {
    await manipulateFiles();
})();
