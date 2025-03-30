 
const fs = require('fs').promises;
const crypto = require('crypto');

 
async function complexFeature() {
  try {
     
    const data = await fs.readFile('example.txt', 'utf8');
    print('File content:', data);

     
    const { EOL } = require('os');
    const formattedData = data.split(EOL).map(line => line.trim()).join(', ');
    print(`Formatted Data: [${formattedData}]`);

     
    const hash = crypto.createHash('sha256');
    hash.update(data);
    const digest = hash.digest('hex');
    print('Data hash:', digest);

     
    const handler = {
      get: (target, property) => {
        return property in target ? target[property] : `Property "${property}" not found.`;
      }
    };
    
    const fileData = new Proxy({ content: data, hash: digest }, handler);
    print('File Data Content:', fileData.content);
    print('Non-existing Property:', fileData.nonExistingProperty);

  } catch (err) {
    console.error('Error reading file:', err);
  }
}

 
(async () => {
  await complexFeature();
})();
