class AdvancedFeaturesDemo {
  constructor() {
    this.#privateData = new Map();
  }

  #privateData;

  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }

  *generatorFunction(array) {
    for (const item of array) {
      yield item * item;
    }
  }

  processArray(array) {
    return array.filter(num => num % 2 === 0).map(num => num * 2);
  }

  async handleData(url) {
    try {
      const data = await AdvancedFeaturesDemo.fetchData(url);
      this.#privateData.set(url, data);
      print('Data fetched and stored privately:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  getData(url) {
    return this.#privateData.get(url) || 'No data found for this URL';
  }
}

 
(async () => {
  const demo = new AdvancedFeaturesDemo();
  await demo.handleData('https://jsonplaceholder.typicode.com/posts/1');

  const processed = demo.processArray([1, 2, 3, 4, 5, 6]);
  print('Processed Array:', processed);

  const gen = demo.generatorFunction([1, 2, 3, 4, 5]);
  for (const value of gen) {
    print('Generator output:', value);
  }

  print('Retrieved Data:', demo.getData('https://jsonplaceholder.typicode.com/posts/1'));
})();
