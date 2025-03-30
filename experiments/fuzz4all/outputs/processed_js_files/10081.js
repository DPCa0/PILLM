 

async function* fetchDataGenerator(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const data = await response.json();
    yield data;
  }
}

async function processUrls(urls) {
  try {
    const results = [];
    for await (const data of fetchDataGenerator(urls)) {
      const { name, value } = data;
      results.push({ name, value });
    }
    return results;
  } catch (error) {
    console.error(`Error processing URLs: ${error.message}`);
  }
}

const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
];

processUrls(urls)
  .then(results => console.log('Processed Results:', results))
  .catch(error => console.error('An error occurred:', error));
