 
async function* fetchAndProcessData(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error fetching ${url}`);
      const data = await response.json();
      yield processComplexData(data);
    } catch (error) {
      console.error(error);
    }
  }
}

 
function processComplexData(data) {
  const { id, values } = data;
  const processedValues = values
    .filter((value) => value.isActive)
    .map(({ amount, ...rest }) => ({
      ...rest,
      amount: amount * 2,
    }))
    .reduce((acc, val) => [...acc, val], []);
  
  return { id, processedValues };
}

 
(async () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];
  
  const results = [];
  
   
  for await (const result of fetchAndProcessData(urls)) {
    results.push(result);
  }
  
  print(results);
})();
