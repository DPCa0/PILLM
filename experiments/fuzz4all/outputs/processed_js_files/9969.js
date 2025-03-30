 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const processData = ({ filePath, encoding = 'utf8', ...options }) => {
      print(`Processing file: ${filePath}, with options:`, options);
      return fs.readFile(filePath, encoding);
    };

     
    const uniqueWords = new Set();

     
    const fileContent = await processData({ filePath: `./data.txt`, additionalOption: true });

     
    const words = fileContent?.split(/\s+/) ?? [];

     
    words.map(word => uniqueWords.add(word.toLowerCase()));

     
    for (const [word] of [...uniqueWords.entries()]) {
      print(`Unique word: ${word}`);
    }

     
    await Promise.all(
      [...uniqueWords].map(async word => {
        await fs.writeFile(`./output/${word}.txt`, `This is the content for the word: ${word}`);
      })
    );

    print('All unique words have been processed and saved to separate files.');
  } catch (error) {
     
    console.error(`An error occurred: ${error.message}`);
  }
})();
