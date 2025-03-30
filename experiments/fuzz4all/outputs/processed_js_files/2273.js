 
import { promises as fs } from 'fs';
import { createHash } from 'crypto';

 
(async () => {
   
  const getFileHash = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf8');
    const hash = createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  };

   
  const processFiles = async (filePaths) => {
    try {
      const results = await Promise.all(filePaths.map(getFileHash));
      results.forEach((hash, index) => {
        print(`File: ${filePaths[index]}, SHA-256 Hash: ${hash}`);
      });
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };

   
  const fileArgs = process.argv.slice(2);
  if (fileArgs.length === 0) {
    print('Please provide file paths as arguments.');
    return;
  }

   
  const uniqueFilePaths = [...new Set(fileArgs)];

   
  await processFiles(uniqueFilePaths);
})();
