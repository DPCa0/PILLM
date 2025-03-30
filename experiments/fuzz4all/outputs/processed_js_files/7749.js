 

const fs = require('fs').promises;

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
function* fileProcessor(files) {
  for (const file of files) {
    yield processFile(file);
  }
}

 
async function processFile(file) {
  try {
    print(`Processing ${file}`);
    const content = await fs.readFile(file, 'utf8');
    print(`Content of ${file}:`, content);
     
    await delay(1000);
    print(`Finished processing ${file}`);
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
}

 
async function main() {
  const files = ['file1.txt', 'file2.txt', 'file3.txt'];
  const processor = fileProcessor(files);
  
  for (let process of processor) {
    await process;
  }
  print('All files processed.');
}

main();
