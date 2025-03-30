 
import { writeFile, readFile } from 'fs/promises';

 
const manageFiles = async () => {
  try {
     
    const filePromises = ['file1.txt', 'file2.txt'].map((fileName, index) => 
      writeFile(fileName, `This is file number ${index + 1}`)
    );

     
    await Promise.all(filePromises);

     
    const readPromises = ['file1.txt', 'file2.txt'].map(readFile);

     
    const [file1Content, file2Content] = await Promise.all(readPromises);

     
    print(`Files read successfully:\n${[...new Set([file1Content, file2Content])].join('\n')}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
manageFiles();
