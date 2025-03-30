 
const delayedHello = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  print('Hello, world!');
};

 
async function fetchData() {
   
  const dataSources = ['API_1', 'API_2', 'API_3'];
  const dataFetchPromises = dataSources.map(async (source) => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    return `Data from ${source}`;
  });

   
  const data = await Promise.all(dataFetchPromises);

   
  const dataObject = data.reduce((acc, val, index) => {
    acc[dataSources[index]] = val;
    return acc;
  }, {});

  return dataObject;
}

 
function* dataGenerator(data) {
  for (const key of Reflect.ownKeys(data)) {
    yield `${key}: ${data[key]}`;
  }
}

 
(async function main() {
  await delayedHello();
  const fetchedData = await fetchData();
  const generator = dataGenerator(fetchedData);

  print('Fetched Data:');
  for (const data of generator) {
    print(data);
  }

   
  const { API_1, API_2, API_3 } = fetchedData;
  console.log(`Summary:
- From API_1: ${API_1}
- From API_2: ${API_2}
- From API_3: ${API_3}`);
})();
