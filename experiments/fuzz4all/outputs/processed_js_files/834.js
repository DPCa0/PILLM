 
const fetchData = new Proxy(
  async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  },
  {
    apply: (target, thisArg, args) => {
      print(`Fetching data from ${args[0]}...`);
      return target(...args);
    },
  }
);

 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

   
  *[Symbol.iterator]() {
    for (const item of this.data) {
      yield item;
    }
  }

   
  static transform(data) {
    return data.map((item) => ({ ...item, processed: true }));
  }
}

 
(async () => {
  try {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    
     
    const data = await fetchData(apiUrl);

     
    const transformedData = DataProcessor.transform(data);

     
    const processor = new DataProcessor(transformedData);

     
    for (const item of processor) {
      print(item);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
