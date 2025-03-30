 
const fs = require('fs').promises;

 
async function processFile(filePath) {
    try {
         
        const data = await fs.readFile(filePath, 'utf8');

         
        const lines = data.split('\n').map((line, index) => `Line ${index + 1}: ${line}`);

         
        const [first, second, ...rest] = lines;

        print('First Line:', first);
        print('Second Line:', second);

         
        const uniqueWords = new Set();
        lines.forEach(line => {
            line.split(' ').forEach(word => uniqueWords.add(word));
        });

        print('Unique Words:', [...uniqueWords]);

        const wordMap = new Map();
        [...uniqueWords].forEach(word => wordMap.set(word, 0));

        lines.forEach(line => {
            line.split(' ').forEach(word => wordMap.set(word, wordMap.get(word) + 1));
        });

        print('Word Count Map:', Object.fromEntries(wordMap));
    } catch (error) {
         
        console.error('Error reading file:', error?.message ?? 'Unknown error');
    }
}

 
(async () => {
    const filePath = './example.txt';  
    await processFile(filePath);
})();
