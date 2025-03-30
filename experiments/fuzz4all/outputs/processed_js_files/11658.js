class AsyncIterator {
  constructor(data) {
    this.data = data;
  }
  
  [Symbol.asyncIterator]() {
    let index = 0;
    const data = this.data;
    return {
      async next() {
        if (index < data.length) {
          const delay = Math.random() * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          return { value: data[index++], done: false };
        }
        return { done: true };
      }
    };
  }
}

async function* filterAsync(asyncIterable, predicate) {
  for await (const item of asyncIterable) {
    if (predicate(item)) yield item;
  }
}

async function runComplexLogic() {
  const data = [10, 20, 30, 40, 50];
  
  const asyncData = new AsyncIterator(data);
  
  const filteredData = filterAsync(asyncData, x => x > 20);
  
  for await (const value of filteredData) {
    print(`Filtered value: ${value}`);
  }
  
  const result = data.map(x => x * 2).reduce((a, b) => a + b, 0);
  
  print(`Sum of doubled values: ${result}`);
  
  const dynamicImport = await import('https://cdn.jsdelivr.net/gh/uuidjs/uuid/dist/esm-browser/index.js');
  const { v4: uuidv4 } = dynamicImport;
  
  print(`Generated UUID: ${uuidv4()}`);
}

runComplexLogic();
