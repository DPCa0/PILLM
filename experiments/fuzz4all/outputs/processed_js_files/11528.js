 
(async () => {
  const fs = await import('fs/promises');
  const { promisify } = await import('util');

   
  async function* fetchLargeDataset() {
    for (let i = 0; i < 100; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));  
      yield { id: i, value: Math.random() };
    }
  }

   
  const sleep = promisify(setTimeout);

   
  async function processDataset() {
    const dataset = fetchLargeDataset();
    const uniqueValues = new Set();
    const promises = [];

    for await (const item of dataset) {
      promises.push(
        (async () => {
          await sleep(10);  
          uniqueValues.add(item.value);
          print(`Processed item with id: ${item.id}`);
        })()
      );
    }

    await Promise.all(promises);
    return uniqueValues;
  }

   
  const result = await processDataset();
  print(`Processed ${result.size} unique items`);

   
  const filePath = './output.txt';
  const data = `Processed dataset with ${result.size ?? 'unknown'} unique values\n`;
  await fs.writeFile(filePath, data, { encoding: 'utf-8' })
    .then(() => console.log(`Results written to ${filePath}`))
    .catch(err => console.error('Error writing file:', err?.message ?? 'Unknown error'));

   
  let retryCount = 0;
  retryCount ||= 3;  
  print(`Retry count set to ${retryCount}`);

})();
