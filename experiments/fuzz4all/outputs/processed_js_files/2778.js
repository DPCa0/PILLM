const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

class DataProcessor {
  static #privateField = "I'm a private field";

  constructor(data) {
    this.data = data;
  }

  *dataIterator() {
    for (const item of this.data) {
      yield item;
    }
  }

  static process(item) {
    return {
      ...item,
      processed: true,
    };
  }

  static #privateMethod() {
    print(this.#privateField);
  }

  printData() {
    DataProcessor.#privateMethod();
    print(this.data.map(DataProcessor.process));
  }
}

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const rawData = await fetchData(url);

  if (!rawData) return;

  const processor = new DataProcessor(rawData);

   
  for (let item of processor.dataIterator()) {
    print('Iterated item:', item);
  }

   
  processor.printData();

   
  if (Math.random() > 0.5) {
    const { dynamicFeature } = await import('./dynamicFeature.js');
    dynamicFeature();
  }
})();
