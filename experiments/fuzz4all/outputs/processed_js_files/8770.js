class FibonacciSequence {
  constructor(maxValue) {
    this.maxValue = maxValue;
    this[Symbol.iterator] = function* () {
      let a = 0, b = 1;
      while (a <= this.maxValue) {
        yield a;
        [a, b] = [b, a + b];
      }
    };
  }
}

const fibonacci = new FibonacciSequence(1000);
const fibArray = [...fibonacci];
print(`Fibonacci numbers up to 1000: ${fibArray.join(', ')}`);

const asyncTimeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
  print('Fetching data...');
  await asyncTimeout(2000);
  print('Data fetched!');
}

(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    print('Fetched Todo:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

fetchData();

const symbolUsage = Symbol('unique');
const symbolObject = {
  [symbolUsage]: 'This is a unique symbol'
};

print(`Symbol value: ${symbolObject[symbolUsage]}`);
