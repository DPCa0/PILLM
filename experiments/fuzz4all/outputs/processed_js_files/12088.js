class AsyncGenerator {
  constructor(limit) {
    this.limit = limit;
    this.current = 0;
  }

  async *[Symbol.asyncIterator]() {
    while (this.current < this.limit) {
      await new Promise(resolve => setTimeout(resolve, 100));
      yield this.current++;
    }
  }
}

const asyncFunction = async () => {
  const asyncGen = new AsyncGenerator(10);
  for await (const num of asyncGen) {
    const doubled = await new Promise(resolve => {
      setTimeout(() => resolve(num * 2), 50);
    });
    print(`Number: ${num}, Doubled: ${doubled}`);
  }
};

asyncFunction()
  .then(() => console.log('Completed!'))
  .catch(err => console.error('Error:', err));

const someObject = { a: 1, b: { c: 2, d: 3 } };
const { a, b: { c, d } } = someObject;
print(`Destructured values: a=${a}, c=${c}, d=${d}`);

const proxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    return `Property ${prop} not found.`;
  }
};

const proxiedObject = new Proxy(someObject, proxyHandler);
print(proxiedObject.a);
print(proxiedObject.notExist);

const array = [1, 2, 3, 4, 5];
const mappedArray = array.map(x => x ** 2);
print('Squared array:', mappedArray);

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const sum = mappedArray.reduce(reducer, 0);
print('Sum of squared array:', sum);

(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  print('Fetched Data:', data);
})();
