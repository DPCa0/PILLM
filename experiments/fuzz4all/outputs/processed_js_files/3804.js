 
(async () => {
  const { promises: fs } = await import('fs');

   
  async function processData() {
    try {
      const data = await fs.readFile('./data.json', 'utf-8');
      const jsonData = JSON.parse(data);

       
      const processedData = jsonData.map(item => ({
        ...item,
        value: item.value * 2,
      })).reduce((acc, curr) => acc + curr.value, 0);

      print('Total value:', processedData);

       
      const nestedValue = jsonData[0]?.nested?.property ?? 'Default Value';
      print('Nested Property:', nestedValue);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

   
  await Promise.all([processData(), anotherAsyncTask()]);

  async function anotherAsyncTask() {
     
    return new Promise(resolve => setTimeout(() => {
      print('Another async task completed');
      resolve();
    }, 1000));
  }
})();
