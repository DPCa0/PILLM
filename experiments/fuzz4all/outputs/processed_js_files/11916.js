 
import { readFile } from 'fs/promises';

 
async function processData() {
  try {
     
    const [{ default: lodash }, fileData] = await Promise.allSettled([
      import('lodash'),
      readFile('./data.json', 'utf-8'),
    ]);

    if (fileData.status === 'rejected' || lodash.status === 'rejected') {
      throw new Error('Failed to load modules or file');
    }

     
    const data = JSON.parse(fileData.value)?.data ?? [];
    
     
    const groupedData = lodash.value.groupBy(data, 'category');

     
    const output = htmlTemplate`<div>${Object.entries(groupedData).map(([key, items]) => 
      `<h2>${key}</h2><ul>${items.map(item => `<li>${item.name}</li>`).join('')}</ul>`
    ).join('')}</div>`;
    
    print(output);
    
  } catch (error) {
    console.error('Error processing data:', error.message);
  }
}

 
function htmlTemplate(strings, ...values) {
  return strings.reduce((result, str, i) => 
    result + str + (values[i] || ''), ''
  ).replace(/[<>]/g, char => ({ '<': '&lt;', '>': '&gt;' }[char]));
}

processData();

This code uses advanced JavaScript features such as dynamic imports, Promise.allSettled, optional chaining, nullish coalescing, lodash for data manipulation, and tagged templates for secure HTML generation.