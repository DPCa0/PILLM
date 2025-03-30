 
import { readFile } from 'fs/promises';
import { createInterface } from 'readline';

 
const processFile = async (filePath) => {
  try {
     
    const data = await readFile(filePath, 'utf8');
     
    const lines = new Set(data.split('\n'));
    
     
    const totalUniqueLines = Reflect.get(lines, 'size');

     
    const proxy = new Proxy(lines, {
      get(target, prop) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop);
      }
    });

     
    [...proxy].forEach(line => {
      if (line.trim()) print(`Unique Line: ${line}`);
    });

     
    const output = (strings, count) => `${strings[0]}${count}${strings[1]}`;
    print(output`Total unique lines: ${totalUniqueLines}`);
    
  } catch (error) {
    console.error(`Error reading file: ${error}`);
  }
};

 
const readInput = async () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

   
  rl[Symbol.asyncIterator] = function() {
    return {
      next: () => new Promise(resolve => rl.once('line', line => resolve({ value: line, done: false })))
    };
  };

   
  for await (const line of rl) {
    print(`Received input: ${line}`);
  }
};

 
processFile('sample.txt');
readInput();
