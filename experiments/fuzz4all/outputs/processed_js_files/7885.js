 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

function* dataProcessor(dataArray) {
  for (const data of dataArray) {
    yield {
      id: data.id,
      processedValue: data.value * 2,  
    };
  }
}

async function processData(url) {
  const fetcher = new DataFetcher(url);
  const rawData = await fetcher.fetchData();

  if (!rawData) return;

  const processedDataArray = [];
  const generator = dataProcessor(rawData);

  for (const processedData of generator) {
    processedDataArray.push(processedData);
  }

  return processedDataArray;
}

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const processedData = await processData(url);

  if (processedData) {
    const [firstItem, secondItem, ...rest] = processedData;
    print('First Processed Item:', firstItem);
    print('Second Processed Item:', secondItem);
    print('Remaining Items:', rest);
  }
})();
