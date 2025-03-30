 
import { promises as fs } from 'fs';

 
async function complexFileOperation() {
  try {
     
    const configData = JSON.parse((await fs.readFile('config.json', 'utf8')) ?? '{}');

     
    const { inputFile = 'input.txt', outputFile = 'output.txt' } = configData;

     
    const uniqueWords = new Set((await fs.readFile(inputFile, 'utf8')).split(/\s+/));

     
    const outputData = [...uniqueWords].join('\n');

     
    await fs.writeFile(outputFile, outputData);

    print(`Unique words from ${inputFile} have been written to ${outputFile}`);
  } catch (error) {
     
    console.error(`An error occurred: ${error?.message}`);
  }
}

 
(() => complexFileOperation())();
