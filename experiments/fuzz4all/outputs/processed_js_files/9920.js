 
import fs from 'fs';
import { promisify } from 'util';
import { createServer } from 'http';
import crypto from 'crypto';

 
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

 
async function processFile(inputPath, outputPath) {
    try {
         
        let data = await readFileAsync(inputPath, 'utf8');

         
        const reversedData = data.split('').reverse().join('');
        const hash = crypto.createHash('sha256').update(reversedData).digest('hex');

         
        await writeFileAsync(outputPath, hash);

        print('File processed successfully.');
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

 
(async () => {
    await processFile('input.txt', 'output.txt');
})();

 
createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        const greeting = 'Hello, world!';
        const reversedGreeting = greeting.split('').reverse().join('');
        const hash = crypto.createHash('sha256').update(reversedGreeting).digest('hex');

        res.end(`<h1>${greeting}</h1><p>Reversed SHA-256: ${hash}</p>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}).listen(3000, () => {
    print('Server is running at http://localhost:3000');
});
