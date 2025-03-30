 
class FibonacciSequence {
  constructor(max) {
    this.max = max;
  }

  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    while (a <= this.max) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

const asyncOp = () => new Promise(resolve => setTimeout(() => resolve('Async Result'), 1000));

(async function advancedFeaturesDemo() {
   
  const fibSeq = new FibonacciSequence(100);
  print('Fibonacci sequence up to 100: ', ...fibSeq);

   
  const [, second, ...rest] = [1, 2, 3, 4, 5];
  print(`Second: ${second}, Rest: ${rest.join(', ')}`);

   
  const result = await asyncOp();
  print(result);

   
  const promises = [1, 2, 3].map(async num => num * 2);
  const doubled = await Promise.all(promises);
  print('Doubled values:', doubled);

   
  const uniqueValues = new Set([1, 2, 3, 3, 4]);
  const valueMap = new Map([...uniqueValues].map(num => [num, num * 10]));
  print('Value Map:', valueMap);

   
  const complexObj = { a: { b: { c: 42 } } };
  const value = complexObj?.a?.b?.d ?? 'Default Value';
  print('Value using optional chaining:', value);
})();
