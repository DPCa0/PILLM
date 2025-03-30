 
import { promises as fs } from 'fs';

 
(async function() {
  try {
     
    const content = `Hello, advanced JavaScript!\nTimestamp: ${new Date().toISOString()}`;

     
    await fs.writeFile('hello.txt', content);

     
    const data = await fs.readFile('hello.txt', 'utf8');

     
    logDetails`File content read: ${data}`;

     
    const wordMap = new Map();
    data.split(/\s+/).forEach(word => {
      wordMap.set(word, (wordMap.get(word) || 0) + 1);
    });

    print('Word occurrences in the file:', [...wordMap.entries()]);
  } catch (error) {
    console.error('Error handling file:', error);
  }
})();

 
function logDetails(strings, ...values) {
  print(strings.raw[0] + values.join(''));
}
