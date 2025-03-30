 
const fs = require('fs').promises;

 
async function processFile() {
  try {
     
    const data = await fs.readFile('data.json', 'utf8');
    const parsedData = JSON.parse(data);

     
    const { name, ...rest } = parsedData;

     
    print(`Hello, ${name}! Processing your data...`);

     
    const processedData = Object.entries(rest).map(([key, value]) => ({
      [key]: typeof value === 'number' ? value * 2 : value.toUpperCase()
    }));

     
    const updatedData = Object.assign({}, ...processedData);

     
    await fs.writeFile('updatedData.json', JSON.stringify({ name, ...updatedData }, null, 2));
    
    print('Data processing complete. Updated data saved.');
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

 
(async () => {
  await processFile();
})();
