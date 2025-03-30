class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  *[Symbol.iterator]() {
    for (let item of this.data) {
      yield this.transformData(item);
    }
  }

  transformData(item) {
    return new Proxy(item, {
      get(target, prop) {
        if (prop in target) {
          return Reflect.get(target, prop);
        }
        print(`Property ${prop} not found!`);
        return null;
      },
    });
  }

  async process() {
    const results = [];
    for await (let item of this) {
      results.push(item);
    }
    return results;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');
    const processor = new DataProcessor(data);
    const processedData = await processor.process();
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
