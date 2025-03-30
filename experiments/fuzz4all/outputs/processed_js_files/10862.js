 
const fs = require('fs').promises;
const http = require('http');

 
const readFileAsync = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};

 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }
  
   
  processData() {
    return this.data.toUpperCase();
  }

   
  static async fetchData(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (response) => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => resolve(data));
      }).on('error', reject);
    });
  }
}

 
(async () => {
  try {
     
    const [localData, remoteData] = await Promise.all([
      readFileAsync('./local.txt'),  
      DataProcessor.fetchData('http://example.com')  
    ]);

    const processor = new DataProcessor(localData);
    print('Processed Local Data:', processor.processData());
    print('Fetched Remote Data:', remoteData);
  } catch (error) {
    console.error(error.message);
  }
})();
