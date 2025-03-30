class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Proxy({}, {
      get: (target, prop) => {
        if (prop in target) {
          print(`Cache hit for ${prop}`);
          return target[prop];
        }
        print(`Calculating fib(${prop})`);
        const result = prop < 2 ? prop : this.calculate(prop - 1) + this.calculate(prop - 2);
        target[prop] = result;
        return result;
      }
    });
  }

  *generate() {
    let n = 0;
    while (n < this.limit) {
      yield this.calculate(n);
      n++;
    }
  }

  calculate(n) {
    return this.memo[n];
  }
}

const fib = new Fibonacci(10);
const fibSequence = [...fib.generate()];
print(fibSequence);

async function delayedLog() {
  const promise = new Promise(resolve => setTimeout(resolve, 1000));
  print('Waiting for 1 second...');
  await promise;
  print('Hello, async world!');
}

delayedLog();

(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  try {
    const data = await fetchData('https://api.spacexdata.com/v4/launches/latest');
    print(`Latest SpaceX Launch: ${data.name}`);
  } catch (error) {
    console.error('Failed to fetch launch data:', error);
  }
})();
