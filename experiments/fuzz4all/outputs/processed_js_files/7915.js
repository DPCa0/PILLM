 
const randomDelay = () => new Promise(resolve => {
  const delay = Math.floor(Math.random() * 2000);
  setTimeout(() => resolve(`Resolved after ${delay}ms`), delay);
});

 
async function* asyncGenerator() {
  for (let i = 0; i < 5; i++) {
    const message = await randomDelay();
    yield message;
  }
}

 
const asyncIterator = async function(generatorFunction, callback) {
  const iterator = generatorFunction();
  for await (const value of iterator) {
    callback(value);
  }
};

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  }
};

const obj = new Proxy({ a: 1, b: 2 }, handler);

 
asyncIterator(asyncGenerator, console.log);

 
print(obj.a);
print(obj.b);
