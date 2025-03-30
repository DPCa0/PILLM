class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.calculateFibonacci();
  }

  *generateFibonacci() {
    let [prev, curr] = [0, 1];
    while (curr <= this.limit) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  calculateFibonacci() {
    return [...this.generateFibonacci()];
  }

  [Symbol.iterator]() {
    return this.sequence.values();
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property ${prop}`);
    }
    return Reflect.get(target, prop, receiver);
  }
};

const proxyFibonacci = new Proxy(new FibonacciSequence(100), handler);

for (const num of proxyFibonacci) {
  print(num);
}

(async function fetchData() {
  try {
    const response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
    const commits = await response.json();
    print(`Fetched ${commits.length} commits.`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
