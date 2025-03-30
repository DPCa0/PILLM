 
import { readFile } from 'fs/promises';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const executeWithRetry = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.error(`Attempt ${i + 1} failed: ${err.message}`);
      if (i === retries - 1) throw err;
    }
    await delay(1000);  
  }
};

 
const readFileWithDelay = async (filePath) => {
  await delay(500);  
  return await readFile(filePath, 'utf8');
};

 
(async () => {
  try {
    const filePath = './example.txt';
    const data = await executeWithRetry(() => readFileWithDelay(filePath));
    print('File content:', data);
  } catch (error) {
    console.error('Failed to read file:', error);
  }
})();
