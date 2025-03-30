class ComplexSystem {
  #privateData = 'This is private';

  constructor() {
    this.data = 'Public Data';
  }

  #processData(input) {
    return input.split('').reverse().join('');
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return this.#processData(JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  *dataGenerator() {
    let index = 0;
    while (index < 5) {
      yield `Data piece ${index++}`;
    }
  }

  get privateData() {
    return this.#privateData;
  }

  static logData(system) {
    print('Static Log:', system.data);
  }
}

const system = new ComplexSystem();
print('Public Data:', system.data);
print('Private Data:', system.privateData);

(async () => {
  const processedData = await system.fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Processed Fetched Data:', processedData);
})();

for (let data of system.dataGenerator()) {
  print(data);
}

ComplexSystem.logData(system);

const promise1 = new Promise((resolve) => setTimeout(resolve, 500, 'First'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 300, 'Second'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 100, 'Third'));

Promise.allSettled([promise1, promise2, promise3]).then((results) =>
  results.forEach((result) => console.log(result))
);
