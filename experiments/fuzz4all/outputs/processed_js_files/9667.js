 
class AdvancedFeatures {
  #secret;  

  constructor(secret) {
    this.#secret = secret;
  }

   
  #revealSecret() {
    return `The secret is: ${this.#secret}`;
  }

   
  async *fetchAndProcessData(urls) {
    for (const url of urls) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        yield this.#processData(data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    }
  }

   
  static calculate(...args) {
    return args.reduce((sum, val) => sum + val, 0);
  }

   
  getSecretMessage() {
    return this.#revealSecret();
  }

   
  #processData(data) {
    return Object.keys(data).map(key => `${key}: ${data[key]}`).join(', ');
  }
}

 
(async () => {
  const instance = new AdvancedFeatures('JavaScript is fun!');
  
  print(instance.getSecretMessage());

  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2'
  ];

  for await (const processedData of instance.fetchAndProcessData(urls)) {
    print(processedData);
  }

  print(`The sum is: ${AdvancedFeatures.calculate(1, 2, 3, 4, 5)}`);
})();
