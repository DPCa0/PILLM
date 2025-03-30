 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
  await delay(1000);
   
  return { data: 'Sample Data from ' + url };
}

 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

   
  processData() {
    return this.data.toUpperCase();
  }

   
  static async fetchDataAndProcess(url) {
    try {
      const { data } = await fetchData(url);
      const processor = new DataProcessor(data);
      return processor.processData();
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }
}

 
(async () => {
  const url = 'https://api.example.com/data';
  const result = await DataProcessor.fetchDataAndProcess(url);
  print('Processed Data:', result);
})();

 
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, val) => acc + val, 0);
print('Sum of numbers:', sum);

 
const target = { name: 'ProxyTarget', value: 42 };
const handler = {
  set(target, property, value) {
    print(`Property ${property} changed from ${target[property]} to ${value}`);
    target[property] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);

 
proxy.name = 'NewName';
proxy.value = 100;
