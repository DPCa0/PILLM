 

 
const target = {
  name: 'Advanced JS',
  description: 'A program demonstrating advanced features'
};

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      return `Property '${prop}' not found.`;
    }
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
  }
};

const proxy = new Proxy(target, handler);

 
async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

function* dataFetcher(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
class ComplexFeature {
  #privateField = 'This is private';

  constructor(value) {
    this.value = value;
  }

  display() {
    print(`Value: ${this.value}, Private Field: ${this.#privateField}`);
  }

  static staticMethod() {
    return 'This is a static method!';
  }
}

 
async function runComplexProgram() {
   
  print(proxy.name);
  print(proxy.unknownProperty);
  proxy.name = 'Updated JS';

   
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const generator = dataFetcher(urls);

  for await (const dataPromise of generator) {
    print('Fetched data:', await dataPromise);
  }

   
  const complex = new ComplexFeature('Example Value');
  complex.display();
  print(ComplexFeature.staticMethod());
}

runComplexProgram().catch(console.error);
