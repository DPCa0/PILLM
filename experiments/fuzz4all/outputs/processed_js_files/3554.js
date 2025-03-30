 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
class DataProcessor {
  #data = [];
  
  async #processData() {
     
    await delay(1000);
    return this.#data.map(item => item.toUpperCase());
  }

  async loadAndProcess(url) {
    const rawData = await fetchData(url);
    if (rawData) {
      this.#data = rawData;
      const processedData = await this.#processData();
      print('Processed Data:', processedData);
    }
  }
}

 
function* createIdGenerator() {
  let id = 0;
  while (true) yield id++;
}

const idGen = createIdGenerator();

const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2'
];

 
Promise.all(urls.map(url => {
  const processor = new DataProcessor();
  print(`Processing with ID: ${idGen.next().value}`);
  return processor.loadAndProcess(url);
}));
