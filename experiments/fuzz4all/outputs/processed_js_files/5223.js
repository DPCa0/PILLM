class AsyncIterable {
  constructor(max) {
    this.max = max;
    this.current = 0;
  }

  async *[Symbol.asyncIterator]() {
    while (this.current < this.max) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield this.current++;
    }
  }
}

async function fetchData(i) {
  return fetch(`https: 
    .then(response => response.json())
    .then(data => data.title);
}

(async () => {
  const asyncIterable = new AsyncIterable(5);
  const fetchedDataPromises = [];

  for await (const num of asyncIterable) {
    fetchedDataPromises.push(fetchData(num + 1));
  }

  const fetchedData = await Promise.all(fetchedDataPromises);
  const dataMap = new Map(fetchedData.map((title, index) => [index + 1, title]));

  const proxy = new Proxy(dataMap, {
    get(target, prop) {
      if (prop in target || target.has(prop)) {
        return target.get(prop);
      }
      return `Title not found for id ${prop}`;
    },
  });

  for (let i = 1; i <= 5; i++) {
    print(`Title for post ${i}: ${proxy[i]}`);
  }
})();
