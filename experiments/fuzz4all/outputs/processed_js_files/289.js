 
import { promises as fs } from 'fs';

 
const manipulateFile = async (filePath) => {
  try {
     
    const data = await fs.readFile(filePath, 'utf8');
    
     
    const logContent = (strings, content) => {
      print(strings[0] + content.toUpperCase() + strings[1]);
    };
    
     
    logContent`File content: ${data}. End of file.`;
    
     
    const uniqueChars = [...new Set(data)];
    
     
    await fs.writeFile('uniqueChars.txt', uniqueChars.join(''), 'utf8');
    print('Unique characters have been saved to uniqueChars.txt');
    
  } catch (error) {
    console.error('Error:', error);
  }
};

 
(async () => {
   
  const path = `./input.txt`;
  await manipulateFile(path);
})();
