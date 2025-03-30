 
import { promises as fs } from 'fs';

 
async function processDataFromFile() {
  try {
     
    const data = await fs.readFile('data.json', 'utf8');
    
     
    const jsonData = JSON.parse(data);

     
    const { name, ...rest } = jsonData;
    const updatedData = { ...rest, name: name.toUpperCase() };

     
    const processedItems = updatedData.items.map((item, index) => {
      return `Item ${index + 1}: ${item.name.toUpperCase()} - ${item.value * 2}`;
    });

     
    const uniqueValues = new Set(processedItems);

     
    await Promise.all([...uniqueValues].map(async (item) => {
      print(`Processed: ${item}`);
    }));

  } catch (error) {
     
    console.error('Error:', error?.message ?? 'Unknown error');
  }
}

 
processDataFromFile();

To use this code, ensure you have a `data.json` file in the same directory, structured as follows:

{
  "name": "sample",
  "items": [
    {"name": "item1", "value": 10},
    {"name": "item2", "value": 20}
  ]
}
