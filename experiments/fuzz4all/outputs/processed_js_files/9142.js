 

async function* asyncGenerator() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .catch(err => console.error('Fetch Error:', err));

  for (let item of data) {
    yield item;
  }
}

async function processData() {
  const itemsToProcess = 5;
  let processedCount = 0;
  const asyncIter = asyncGenerator();

  while (processedCount < itemsToProcess) {
    try {
      const { value, done } = await asyncIter.next();
      if (done) break;

      print(`Processing: ${value.title}`);
      processedCount++;

    } catch (error) {
      console.error('Processing Error:', error);
      break;
    }
  }

  print('Processing complete.');
}

(async () => {
  await processData();
})();

 
 
 
 
 
