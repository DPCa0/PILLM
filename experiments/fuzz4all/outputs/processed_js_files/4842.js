 
const crypto = require('crypto');
const { readFile } = require('fs').promises;

 
(async function() {
    try {
         
        const data = await readFile('example.txt', 'utf8');
        print('File content:', data);

         
        const [firstLine, ...restLines] = data.split('\n');
        print('First line:', firstLine);
        print('Rest of the lines:', restLines);

         
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        print('Data Hash:', hash);

         
        const words = new Set(data.split(/\s+/));
        const wordFrequencyMap = new Map();
        words.forEach(word => {
            const count = data.split(word).length - 1;
            wordFrequencyMap.set(word, count);
        });

         
        print(`Unique words: ${[...words]}`);
        print(`Word Frequencies:`);
        wordFrequencyMap.forEach((value, key) => {
            print(`  ${key}: ${value}`);
        });

         
        const filterShortWords = (threshold) => [...words].filter(word => word.length > threshold);
        print('Words longer than 3 characters:', filterShortWords(3));

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
