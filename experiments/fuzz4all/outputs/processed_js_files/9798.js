class AdvancedFeatureExample {
  #privateVariable = 'I am private';
  
  constructor(name) {
    this.name = name;
  }

  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }

  #privateMethod() {
    print('Accessing private method:', this.#privateVariable);
  }

  publicMethod() {
    print(`Hello, my name is ${this.name}`);
    this.#privateMethod();
  }

  *generatorFunction(limit) {
    let count = 0;
    while (count < limit) {
      yield count++;
    }
  }

  async logFetchedData(url) {
    try {
      const data = await AdvancedFeatureExample.fetchData(url);
      print('Fetched Data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

(async () => {
  const example = new AdvancedFeatureExample('John Doe');
  example.publicMethod();

  print('\nUsing Generator Function:');
  const generator = example.generatorFunction(5);
  for (const value of generator) {
    print(value);
  }

  print('\nFetching data using async/await:');
  await example.logFetchedData('https://jsonplaceholder.typicode.com/todos/1');
})();
