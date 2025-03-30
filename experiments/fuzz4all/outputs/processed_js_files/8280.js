 

 
async function* fetchData(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      yield data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      yield null;
    }
  }
}

 
const logHandler = {
  get(target, propKey, receiver) {
    const origMethod = target[propKey];
    return function (...args) {
      print(`Method ${propKey} called with args: ${JSON.stringify(args)}`);
      return origMethod.apply(this, args);
    };
  }
};

 
const sampleObject = {
  sum(a, b) {
    return a + b;
  },
  multiply(a, b) {
    return a * b;
  }
};

const proxiedObject = new Proxy(sampleObject, logHandler);

 
async function main() {
  const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];
  const dataGen = fetchData(urls);

  for await (const data of dataGen) {
    if (data) {
      print(`Received data: ${JSON.stringify(data)}`);
      const resultSum = proxiedObject.sum(data.userId, data.id);
      print(`Sum result: ${resultSum}`);
      const resultMultiply = proxiedObject.multiply(data.userId, data.id);
      print(`Multiply result: ${resultMultiply}`);
    }
  }
}

main().catch(console.error);
