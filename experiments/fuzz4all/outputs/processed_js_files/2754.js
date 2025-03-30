 
const { promises: fs } = require('fs');
const { EOL } = require('os');

 
(async () => {
  try {
     
    const data = await fs.readFile('data.json', 'utf8');
    const jsonData = JSON.parse(data);

     
    const transformedData = jsonData
      .filter(item => item.active)   
      .map(({ id, name }) => ({ id, name: name.toUpperCase() }));  

     
    const uniqueNames = [...new Set(transformedData.map(item => item.name))];

     
    const createMessage = (strs, ...values) => 
      strs.reduce((acc, str, i) => acc + str + (values[i] || ''), '');

    const message = createMessage`Processed ${uniqueNames.length} unique names:${EOL}${uniqueNames.join(EOL)}`;

     
    await fs.writeFile('output.txt', message, 'utf8');

    print('File has been processed successfully.');
  } catch (err) {
    console.error('Error processing file:', err);
  }
})();

Note: This script assumes there is a `data.json` file in the same directory containing JSON data with `id`, `name`, and `active` fields.