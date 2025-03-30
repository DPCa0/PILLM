 
const uniqueSymbol = Symbol('unique');

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  [uniqueSymbol]() {
    return this.data.map(item => item * 2);
  }
  
  async processData() {
    const doubled = await this.doubleData();
    const result = doubled.filter(num => num > 5);
    return result;
  }

  doubleData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = this[uniqueSymbol]();
        resolve(result);
      }, 1000);
    });
  }
}

const fetchData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5]);
    }, 500);
  });
};

const main = async () => {
  try {
    const data = await fetchData();
    const processor = new DataProcessor(data);
    const { 0: first, ...rest } = await processor.processData();
    
    print('First:', first);
    print('Rest:', rest);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
