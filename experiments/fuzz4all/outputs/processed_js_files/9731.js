 
import { promises as fs } from 'fs';
import crypto from 'crypto';

 
const logDecorator = (fn) => async (...args) => {
    print(`Calling function ${fn.name} with args: ${JSON.stringify(args)}`);
    const result = await fn(...args);
    print(`Result of function ${fn.name}: ${JSON.stringify(result)}`);
    return result;
};

 
const computeFileHash = logDecorator(async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return crypto.createHash('sha256').update(data).digest('hex');
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        throw error;
    }
});

 
(async () => {
    const filePath = './example.txt';  
    try {
        const hash = await computeFileHash(filePath);
        print(`SHA256 hash of the file '${filePath}': ${hash}`);
    } catch (error) {
        console.error(`Failed to compute hash: ${error.message}`);
    }
})();
