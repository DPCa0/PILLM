 
 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'valid') {
        resolve({ data: { results: [{ name: 'Alice' }, { name: 'Bob' }] } });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
}

 
function* dataGenerator(pages) {
  for (let i = 1; i <= pages; i++) {
    yield fetchData('valid');
  }
}

 
async function processData() {
  let allResults = [];
  const generator = dataGenerator(3);

  for await (let pagePromise of generator) {
    try {
      const { data: { results } } = await pagePromise;
      allResults = [...allResults, ...results];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  print('Processed Results:', allResults);
}

 
(async () => {
  print('Starting data processing...');
  await processData();
  print('Data processing completed.');
})();
