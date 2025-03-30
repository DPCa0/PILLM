class FibonacciSequence {
  constructor(maxValue) {
    this.maxValue = maxValue;
    this.sequence = this._generateSequence();
  }

  *_fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (curr <= this.maxValue) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  _generateSequence() {
    const generator = this._fibonacciGenerator();
    return [...generator];
  }

  [Symbol.iterator]() {
    let index = 0;
    const sequence = this.sequence;
    return {
      next: () => ({
        value: sequence[index],
        done: index++ >= sequence.length
      })
    };
  }
}

 
const loggerHandler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  }
};

const fibonacci = new Proxy(new FibonacciSequence(100), loggerHandler);

 
async function displayFibonacci() {
  print("Fibonacci sequence up to 100:");
  for (let number of fibonacci) {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    print(number);
  }
}

displayFibonacci();
