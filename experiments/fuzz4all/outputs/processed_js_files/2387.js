 
import { promises as fs } from 'fs';
import path from 'path';

 
(async () => {
  try {
     
    const files = await fs.readdir('.');
    
     
    const jsFiles = files.filter(file => file.endsWith('.js'));
    const fileContentsPromises = jsFiles.map(async (file) => {
      const content = await fs.readFile(file, 'utf8');
      return { file, content };
    });
    
     
    const fileContents = await Promise.all(fileContentsPromises);
    
     
    const wordsSet = new Set();
    fileContents.forEach(({ content }) => {
      content.split(/\W+/).forEach(word => {
        if (word) wordsSet.add(word.toLowerCase());
      });
    });

     
    const sortedWords = [...wordsSet].sort((a, b) => a.localeCompare(b));
    
     
    print(`JavaScript files in the directory:\n${jsFiles.join(', ')}`);
    print(`Unique words found:\n${sortedWords.join(', ')}`);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
})();
