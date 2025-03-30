 
const fs = require('fs').promises;

 
class DataProcessor {
  constructor(filePath) {
    this.filePath = filePath;
  }

   
  static async processFiles(filePaths) {
    return Promise.all(filePaths.map(async (path) => {
      const processor = new DataProcessor(path);
      return processor.processFile();
    }));
  }

   
  async processFile() {
    try {
       
      const [data, stats] = await Promise.all([fs.readFile(this.filePath, 'utf8'), fs.stat(this.filePath)]);
       
      print(`File: ${this.filePath}\nSize: ${stats.size} bytes\nContent:\n${data}`);
    } catch (error) {
      console.error(`Error processing file ${this.filePath}: ${error.message}`);
    }
  }
}

 
(async () => {
  const filePaths = ['./file1.txt', './file2.txt'];
  await DataProcessor.processFiles(filePaths);
})();
