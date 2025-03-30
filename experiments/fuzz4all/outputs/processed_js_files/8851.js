 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const [file1, file2] = await Promise.all([
      fs.readFile('./file1.txt', 'utf8'),
      fs.readFile('./file2.txt', 'utf8')
    ]);

    const processContent = (content) => {
       
      const lines = [...new Set(content.split('\n'))];
       
      return lines
        .filter((line) => line.length > 0)
        .map((line, index) => `${index + 1}: ${line.toUpperCase()}`)
        .join('\n');
    };

    const outputContent = `Processed file1:\n${processContent(file1)}\n\nProcessed file2:\n${processContent(file2)}`;

     
    await fs.writeFile('./output.txt', outputContent, 'utf8');

    print('Files have been processed and saved to output.txt');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
