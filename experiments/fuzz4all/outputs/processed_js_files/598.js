const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield `Async Iteration ${i + 1}`;
    }
  }
};

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
  return response.json();
}

function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const dataProcessor = async (urls) => {
  const idGen = idGenerator();
  const results = await Promise.all(urls.map(url => fetchData(url)));
  return results.map(data => ({ id: idGen.next().value, ...data }));
};

(async () => {
  try {
     
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    
    print("Starting async iteration:");
    for await (const message of asyncIterable) {
      print(message);
    }

    print("\nProcessing data from URLs:");
    const processedData = await dataProcessor(urls);
    print(processedData);

  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
