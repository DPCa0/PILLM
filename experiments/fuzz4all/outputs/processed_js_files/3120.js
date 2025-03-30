class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async *processData() {
    for (const item of this.data) {
       
      yield new Promise(resolve => setTimeout(() => resolve(item * 2), 100));
    }
  }

  static #privateHelper(data) {
    return data.filter(item => item > 10);
  }

  processAndFilter() {
    const processedData = DataProcessor.#privateHelper(this.data);
    return [...processedData].map(item => item * 3);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'data') {
      print('Accessing data');
    }
    return Reflect.get(target, prop, receiver);
  }
};

const rawData = [1, 5, 15, 20, 25];
const processor = new Proxy(new DataProcessor(rawData), handler);

 
(async () => {
  print('Processed Async Data:');
  for await (const item of processor.processData()) {
    print(item);
  }
})();

 
print('Processed and Filtered Data:', processor.processAndFilter());

 
const config = { feature: { enabled: false } };
print(config?.feature?.enabled ?? 'Not Available');

 
function tag(strings, ...values) {
  return strings.raw.reduce((prev, curr, i) => prev + curr + (values[i] ?? ''), '');
}
const name = 'World';
print(tag`Hello, ${name}!`);
