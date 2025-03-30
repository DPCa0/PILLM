 

async function* asyncGeneratorFunction(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

async function processUrls(urls) {
  const processedData = [];

  for await (const dataPromise of asyncGeneratorFunction(urls)) {
    try {
      const data = await dataPromise;
      processedData.push(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  }

  return processedData;
}

 
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
];

processUrls(urls).then(data => {
  print("Processed Data:", data);
}).catch(error => {
  console.error("Error during processing:", error);
});
