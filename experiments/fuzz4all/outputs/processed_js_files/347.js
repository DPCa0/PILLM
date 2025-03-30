 
import readline from 'readline';
import { promises as fs } from 'fs';

 
async function readFileLines(filePath) {
    const fileStream = await fs.readFile(filePath, 'utf-8');
    return fileStream.split('\n');
}

 
function* generateSequence(max) {
    for (let i = 1; i <= max; i++) {
        yield i;
    }
}

 
async function* asyncNumberGenerator(limit) {
    for (const num of generateSequence(limit)) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield num;
    }
}

 
async function processFileAndGenerateNumbers() {
    try {
         
        const filePath = `./example.txt`;

         
        const lines = await readFileLines(filePath);

        print('File Lines:');
        for (const line of lines) {
            print(line);
        }

        print('\nGenerated Numbers:');
         
        for await (const num of asyncNumberGenerator(5)) {
            print(num);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

 
(async () => {
    await processFileAndGenerateNumbers();
})();

Note: This script assumes an `example.txt` file is present in the same directory with some text content to read.