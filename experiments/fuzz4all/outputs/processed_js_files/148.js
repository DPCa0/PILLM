class FibonacciSequence {
  constructor(max) {
    this.max = max;
    this[Symbol.iterator] = function* () {
      let [prev, curr] = [0, 1];
      while (curr <= this.max) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
      }
    }
  }

  async calculateSum() {
    const sum = await this.reduceAsync(this[Symbol.iterator](), (acc, val) => acc + val, 0);
    print(`Sum of Fibonacci sequence up to ${this.max}:`, sum);
  }

  reduceAsync(iterator, reducer, initialValue) {
    return new Promise((resolve) => {
      const iterate = (acc, { value, done }) => {
        if (done) {
          resolve(acc);
        } else {
          setTimeout(() => iterate(reducer(acc, value), iterator.next()), 0);
        }
      };
      iterate(initialValue, iterator.next());
    });
  }
}

const fibonacci = new FibonacciSequence(1000);
fibonacci.calculateSum();

 
const proxy = new Proxy(fibonacci, {
  get(target, prop) {
    print(`Accessed property "${prop}"`);
    return target[prop];
  },
});

print(proxy.max);  
