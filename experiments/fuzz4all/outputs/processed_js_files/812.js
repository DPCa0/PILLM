 
(async () => {
  const fs = await import('fs').then(module => module.promises);
  const { promisify } = await import('util');

   
  const delay = promisify(setTimeout);

   
  async function modifyJsonFile(filePath) {
    try {
       
      const data = await fs.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(data);

       
      jsonData.visits = (jsonData.visits ?? 0) + 1;

      print(`Visits: ${jsonData.visits}`);

       
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));

       
      await delay(1000);
      print('File updated and process complete.');
      
    } catch (error) {
      console.error('Error handling the JSON file:', error);
    }
  }

   
  await modifyJsonFile('./data.json');
})();
