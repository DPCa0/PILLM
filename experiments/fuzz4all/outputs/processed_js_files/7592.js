 
import { promises as fs } from 'fs';
import fetch from 'node-fetch';

 
async function fetchAndProcessData(url, filePath) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();

     
    const processedData = data.map(item => item.value).reduce((acc, curr) => acc + curr, 0);

     
    const fileContent = `The total value of the dataset is: ${processedData}`;

     
    await fs.writeFile(filePath, fileContent, 'utf8');

    print('Data processed and saved successfully.');

  } catch (error) {
     
    console.error('Error fetching or processing data:', error);
  }
}

 
function buildUrl(base, ...parts) {
  return parts.reduce((acc, part) => acc + '/' + encodeURIComponent(part), base);
}

 
(async () => {
  const baseURL = 'https://api.example.com/data';
  const endpoint = buildUrl(baseURL, 'endpoint', 'subresource');
  await fetchAndProcessData(endpoint, './output.txt');
})();

Note: To run this code, you may need to ensure that the `node-fetch` library is installed in your environment. You can do this by running `npm install node-fetch`. Additionally, replace the API URL and endpoint with a real one for testing purposes.