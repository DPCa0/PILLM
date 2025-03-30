 
function* dataGenerator() {
  yield new Promise((resolve) => setTimeout(() => resolve('Data 1'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 2'), 500));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 3'), 1500));
}

async function consumeGenerator(gen) {
  const generator = gen();
  for (let promise of generator) {
    try {
      const data = await promise;
      print(`Received: ${data}`);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property] ?? 'Property does not exist';
  }
};

const proxyObj = new Proxy({ name: 'Advanced JS', level: 'Complex' }, handler);
print(proxyObj.name);
print(proxyObj.nonExistentProperty);

 
const { x = 10, y = 20 } = { x: 15 };
print(`x: ${x}, y: ${y}`);

 
const sumAll = (...numbers) => numbers.reduce((sum, number) => sum + number, 0);
const values = [1, 2, 3, 4];
print(`Sum: ${sumAll(...values)}`);

 
consumeGenerator(dataGenerator);
