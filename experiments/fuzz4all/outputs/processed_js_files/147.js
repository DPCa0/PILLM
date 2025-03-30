 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  print('Fetching data...');
  await delay(1000);  
  return { data: [1, 2, 3, 4, 5] };
}

 
function* processData(data) {
  for (const item of data) {
    yield item * 2;
  }
}

 
async function* asyncDataProcessor(data) {
  const generator = processData(data);
  for (let value of generator) {
    await delay(500);  
    yield value;
  }
}

 
(async () => {
  try {
    const { data } = await fetchData();
    print('Original data:', data);

    const processedData = [];
    for await (let item of asyncDataProcessor(data)) {
      print('Processing item:', item);
      processedData.push(item);
    }

    print('Processed data:', processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
