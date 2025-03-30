 
import { promises as fs } from 'fs';

 
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

 
async function* dataProcessor(data) {
  for (let item of data) {
     
    const { id, ...rest } = item;
    yield { id, ...rest, processed: true };
  }
}

 
const main = async () => {
  try {
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');

     
    let processedData = [];

     
    for await (let item of dataProcessor(data)) {
      processedData.push(item);
    }

     
    await fs.writeFile('processedData.json', JSON.stringify(processedData, null, 2));
    print('Data processed and saved to processedData.json');

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
main();
