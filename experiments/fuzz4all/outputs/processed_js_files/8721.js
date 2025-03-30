 
import fs from 'fs/promises';

 
(async function main() {
    try {
         
        const [file1, file2] = await Promise.all([
            fs.readFile('file1.txt', 'utf8'),
            fs.readFile('file2.txt', 'utf8')
        ]);

         
        const taggedTemplate = (strings, ...values) => strings.raw.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
        
        const result = taggedTemplate`File 1 Content: ${file1}\nFile 2 Content: ${file2}\n`;

         
        const output = {
            timestamp: new Date().toISOString(),
            result
        };

         
        const dynamicKey = 'extraInfo';
        const finalOutput = { ...output, [dynamicKey]: 'Advanced JS in action!' };

         
        for await (const line of finalOutput.result.split('\n')) {
            print(line);
        }

    } catch (err) {
         
        console.error('An error occurred:', err?.message ?? 'Unknown error');
    }
})();
