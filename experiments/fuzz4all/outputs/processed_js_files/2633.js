 
async function* fetchUrls(urls) {
  const requests = urls.map(async (url) => {
    const response = await fetch(url);
    return response.json();
  });

  const results = await Promise.all(requests);
  for (const result of results) {
    yield result;
  }
}

async function main() {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
  ];

  const processedData = [];
  for await (const data of fetchUrls(urls)) {
    const { id, value } = data;
    processedData.push({ id, calculatedValue: value * 2 });
  }

  print('Processed Data:', processedData);
}

main().catch(console.error);
