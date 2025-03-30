 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }
  
  async processData() {
    try {
      const cleanedData = this.cleanData(this.data);
      const [numData, strData] = await Promise.all([
        this.processNumbers(cleanedData),
        this.processStrings(cleanedData)
      ]);

      return { numData, strData };
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }
  
  cleanData(data) {
    return data.filter(item => typeof item === 'string' || typeof item === 'number');
  }

  async processNumbers(data) {
    return new Promise((resolve, reject) => {
      const numbers = data.filter(item => typeof item === 'number');
      resolve(numbers.map(num => num * 2));
    });
  }

  async processStrings(data) {
    const processChar = async function* (str) {
      for (const char of str) {
        yield char.toUpperCase();
      }
    };

    return Promise.all(data.filter(item => typeof item === 'string').map(async str => {
      let result = '';
      for await (const char of processChar(str)) {
        result += char;
      }
      return result;
    }));
  }
}

 
(async () => {
  const mixedData = [1, 'apple', 2, 'banana', 3, null, 'cherry', 4];
  const processor = new DataProcessor(mixedData);
  
  const { numData, strData } = await processor.processData();
  print('Processed Numbers:', numData);
  print('Processed Strings:', strData);
})();
