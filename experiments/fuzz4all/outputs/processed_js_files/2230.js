 
import { promises as fs } from 'fs';
import { promisify } from 'util';

 
async function* readLines(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  yield* data.split('\n');
}

 
const createLoggingProxy = (obj) => new Proxy(obj, {
  get(target, prop) {
    print(`Getting ${String(prop)}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${String(prop)} to ${value}`);
    target[prop] = value;
    return true;
  }
});

 
async function processFile(filePath) {
  const fileLines = readLines(filePath);

  const resultObj = createLoggingProxy({ lineCount: 0, words: 0 });

  for await (const line of fileLines) {
    resultObj.lineCount++;
    resultObj.words += line.split(/\s+/).filter(Boolean).length;
  }

  return resultObj;
}

 
(async () => {
  try {
    const stats = await processFile('sample.txt');
    print(`Line count: ${stats.lineCount}`);
    print(`Word count: ${stats.words}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();

This JavaScript program uses several advanced features like async generators, Promises, Proxies, and the Node.js `fs` module to asynchronously read a text file and count the number of lines and words, logging property accesses of the results.