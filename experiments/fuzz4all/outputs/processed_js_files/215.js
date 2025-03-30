const { from } = require('rxjs');
const { map, filter, reduce } = require('rxjs/operators');

class FibonacciGenerator {
  constructor(limit) {
    this.limit = limit;
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

const limit = 10;
const fibGen = new FibonacciGenerator(limit);
const fibs$ = from([...fibGen]);

fibs$.pipe(
  filter(n => n % 2 === 0),
  map(n => n ** 2),
  reduce((acc, n) => acc + n, 0)
).subscribe({
  next: sum => console.log(`Sum of squares of even Fibonacci numbers up to ${limit}:`, sum),
  error: err => console.error('Error:', err),
  complete: () => console.log('Stream processing complete.')
});
