class DataProcessor {
  #data;

  constructor(data) {
    this.#data = data;
  }

  async *processData() {
    for (let item of this.#data) {
       
      await new Promise(resolve => setTimeout(resolve, 100));
      yield this.#transform(item);
    }
  }

  #transform(item) {
    return item ** 2;
  }
}

const processAsync = async () => {
  const data = [1, 2, 3, 4, 5];
  const processor = new DataProcessor(data);

  const processedData = [];

  for await (let result of processor.processData()) {
    processedData.push(result);
  }

  print(`Transformed Data: ${processedData.join(', ')}`);
};

 
const config = {
  apiEndpoint: 'https://api.example.com',
  retries: undefined
};

const endpoint = config?.apiEndpoint ?? 'https://default.api';
const retries = config?.retries ?? 3;

print(`API Endpoint: ${endpoint}, Retries: ${retries}`);

 
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
const numbers = [1, 2, 3, 4, 5];
print(`Sum of numbers: ${sum(...numbers)}`);

processAsync();
