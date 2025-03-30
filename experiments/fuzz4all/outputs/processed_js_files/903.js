class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

const logFibonacciSequence = async (n) => {
  const fib = new Fibonacci();
  const sequence = Array.from({ length: n }, (_, i) => fib.calculate(i));

  print(`Fibonacci sequence up to ${n}: `, sequence);

  try {
    const data = await getData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

logFibonacciSequence(10);

 
const nestedObject = {
  level1: {
    level2: {
      level3: 'Deep value'
    }
  }
};

print(nestedObject?.level1?.level2?.level3 ?? 'Default value');
print(nestedObject?.level1?.level4?.level3 ?? 'Default value');

 
const loadModule = async (moduleName) => {
  try {
    const module = await import(`./modules/${moduleName}.js`);
    module.default();
  } catch (err) {
    console.error('Error loading module:', err);
  }
};

loadModule('exampleModule');
