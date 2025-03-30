class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.calculateFibonacci();
  }

  *generateFibonacci() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [a, b] = [b, a + b];
      yield a;
    }
  }

  calculateFibonacci() {
    return Array.from(this.generateFibonacci());
  }

  static async fetchData(url) {
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

const fibonacci = new Fibonacci(10);
print('Fibonacci Sequence:', fibonacci.sequence);

(async () => {
  const data = await Fibonacci.fetchData('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
  const commitMessages = data.map(commit => commit.commit.message);
  print('Recent commit messages:', commitMessages.slice(0, 5));
})();

const composedFunction = (...funcs) => (initialValue) =>
  funcs.reduce((acc, func) => func(acc), initialValue);

const double = x => x * 2;
const increment = x => x + 1;
const square = x => x * x;

const combinedFunction = composedFunction(double, increment, square);
print('Result of composed function:', combinedFunction(3));  
