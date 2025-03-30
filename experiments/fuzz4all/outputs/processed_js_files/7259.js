 
import { promises as fsPromises } from 'fs';

 
class DataProcessor {
  constructor(filePath) {
    this.filePath = filePath;
  }

   
  async *lineGenerator() {
    const data = await fsPromises.readFile(this.filePath, 'utf-8');
    const lines = data.split('\n');
    for (const line of lines) {
      yield line;
    }
  }

   
  async processLines() {
    const lineGen = this.lineGenerator();
    const uniqueWords = new Set();
    let lineData;
    while (!(lineData = await lineGen.next()).done) {
      lineData.value.split(/\W+/).forEach(word => uniqueWords.add(word.toLowerCase()));
    }
    return uniqueWords;
  }

   
  createLoggedSet() {
    const handler = {
      set(obj, prop, value) {
        print(`Adding "${value}" to set`);
        obj[prop] = value;
        return true;
      }
    };
    return new Proxy(new Set(), handler);
  }

  async run() {
    const uniqueWords = await this.processLines();
    const loggedSet = this.createLoggedSet();
    uniqueWords.forEach(word => loggedSet.add(word));
    print('Unique Words:', Array.from(loggedSet).sort());
  }
}

 
const dataProcessor = new DataProcessor('sample.txt');
dataProcessor.run().catch(err => console.error('Error processing file:', err));
