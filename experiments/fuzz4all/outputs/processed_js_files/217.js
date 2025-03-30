class AsyncDataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

function* dataProcessor(data) {
  for (let item of data) {
    yield item * 2;  
  }
}

async function run() {
  const url = 'https://api.example.com/data';
  const fetcher = new AsyncDataFetcher(url);
  const data = await fetcher.fetchData();

  if (data) {
    const processor = dataProcessor(data);

    for (let processed of processor) {
      print('Processed data:', processed);
    }

    const results = data.map(async (item) => {
      return await Promise.resolve(item * 3);  
    });

    const finalResults = await Promise.all(results);
    print('Final results:', finalResults);
  }
}

run();
