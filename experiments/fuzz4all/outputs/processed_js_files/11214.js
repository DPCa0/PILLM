 

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* createAsyncGenerator() {
  for (let i = 0; i < 5; i++) {
    await delay(500);  
    yield `Iteration ${i}: ${new Date().toLocaleTimeString()}`;
  }
}

(async function main() {
  const asyncIterator = createAsyncGenerator();

  print('Starting asynchronous generator...');

  for await (let message of asyncIterator) {
    print(message);
  }

  print('Asynchronous generator completed.');

   
  const map = new Map([['name', 'Alice'], ['age', 30]]);
  const set = new Set(['apple', 'banana', 'orange']);

  const [fruit1, fruit2, fruit3] = set;

  print(`Map has name: ${map.get('name')}, age: ${map.get('age')}`);
  print(`Set contains fruits: ${fruit1}, ${fruit2}, ${fruit3}`);

   
  const person = { name: 'Bob', age: 25, city: 'New York' };
  const { city, ...rest } = person;

  print(`Person lives in ${city}. Other details:`, rest);

  const add = (...numbers) => numbers.reduce((a, b) => a + b, 0);
  print(`Sum of numbers: ${add(1, 2, 3, 4, 5)}`);

   
  const handler = {
    set(target, property, value) {
      print(`Property ${property} set to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const observedObject = new Proxy({ x: 10, y: 20 }, handler);
  observedObject.x = 30;
  observedObject.z = 40;

   
  const promise1 = Promise.resolve('Resolved!');
  const promise2 = Promise.reject('Rejected!');
  const promise3 = Promise.resolve('Another resolved!');

  const results = await Promise.allSettled([promise1, promise2