class Fibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *generator(n) {
    for (let i = 0; i <= n; i++) {
      yield this.fib(i);
    }
  }

  fib(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fibonacci = new Fibonacci();

(async () => {
  const fibArray = [];
  for (let value of fibonacci.generator(10)) {
    fibArray.push(value);
  }

  const sum = fibArray.reduce((a, b) => a + b, 0);
  const [first, ...rest] = fibArray;
  
  const asyncSquare = async (num) => num * num;
  const squares = await Promise.all(rest.map(num => asyncSquare(num)));

  print(`Fibonacci Series: ${fibArray}`);
  print(`Sum: ${sum}`);
  print(`Squares (without first): ${squares}`);
})();
