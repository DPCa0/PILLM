class DataLoader {
  async *fetchData(endpoints) {
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed to fetch: ${endpoint}`);
        const data = await response.json();
        yield data;
      } catch (error) {
        console.error(error);
        yield null;
      }
    }
  }
}

const processData = async (endpoints) => {
  const loader = new DataLoader();
  const results = [];
  for await (const data of loader.fetchData(endpoints)) {
    if (data) {
      results.push(data);
    }
  }
  return results;
};

const uniqueResults = async (endpoints) => {
  const data = await processData(endpoints);
  return [...new Map(data.flat().map(item => [item.id, item])).values()];
};

 
(async () => {
  const endpoints = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];

  try {
    const uniqueData = await uniqueResults(endpoints);
    print('Unique Data:', uniqueData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
