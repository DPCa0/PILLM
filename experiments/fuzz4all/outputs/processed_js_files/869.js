 
const fs = require('fs').promises;
const path = require('path');

 
async function processJsonFiles() {
  try {
     
    const files = await fs.readdir(__dirname);

     
    const jsonFiles = files.filter(file => path.extname(file) === '.json');

     
    const jsonDataMap = new Map();

     
    for (const file of jsonFiles) {
      const filePath = path.join(__dirname, file);
      const data = await fs.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      
       
      const { id, value } = jsonData;

       
      print(`Processing file: ${file} | ID: ${id} | Value: ${value}`);

       
      jsonDataMap.set(file, jsonData);
    }

     
    const results = Array.from(jsonDataMap.values()).map(({ id, value }) => ({
      id,
      value: value * 2,   
    }));

     
    print('Transformed Results:', results);
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

 
(async () => {
  await processJsonFiles();
})();
