 
import fetch from 'node-fetch';

 
const metaKey = Symbol('metadata');

class AdvancedFeatureDemo {
  constructor(name) {
    this.name = name;
    this[metaKey] = { created: new Date() };  
  }

   
  *generateSequence(limit) {
    for (let i = 0; i < limit; i++) {
      yield i;
    }
  }

   
  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

   
  static processArray(arr) {
    return arr.map(x => x * 2).filter(x => x % 3 === 0);
  }
}

 
const demo = new AdvancedFeatureDemo('Demo Instance');

print('Generated Sequence:', [...demo.generateSequence(10)]);

(async () => {
  const data = await demo.fetchData('https://api.example.com/data');
  print('Fetched Data:', data);
})();

print('Processed Array:', AdvancedFeatureDemo.processArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));

print('Metadata:', demo[metaKey]);
