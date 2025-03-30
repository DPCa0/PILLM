 
import { promises as fs } from 'fs';

 
async function processFile(inputPath, outputPath) {
    try {
         
        const data = await fs.readFile(inputPath, 'utf-8');

         
        const transformedData = data
            .split('\n')
            .filter(line => line.trim() !== '')  
            .map((line, index) => `${index + 1}: ${line}`)  
            .join('\n');

         
        await fs.writeFile(outputPath, transformedData, 'utf-8');
        
        print(`File has been processed and saved to ${outputPath}`);
    } catch (error) {
         
        console.error(tagError`Error: ${error.message}`);
    }
}

 
function tagError(strings, errorMessage) {
    return `${strings[0]} 🚨 ${errorMessage} 🚨`;
}

 
(async () => {
    await processFile('input.txt', 'output.txt');
})();
