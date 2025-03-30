 
const asyncIterable = {
  [Symbol.asyncIterator]: () => ({
    i: 0,
    next() {
      if (this.i < 5) {
        return new Promise(resolve => {
          setTimeout(() => resolve({ value: this.i++, done: false }), 1000);
        });
      }
      return Promise.resolve({ done: true });
    }
  })
};

 
const mergeArrays = (...arrays) => {
  return arrays.reduce((acc, curr) => [...acc, ...curr], []);
};

 
function* fibonacci(n) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
async function processAsyncIterable() {
  for await (let num of asyncIterable) {
    const fibSequence = [...fibonacci(num)];
    const array1 = [num, ...fibSequence];
    const array2 = [Math.pow(num, 2), ...fibSequence.map(x => x * 2)];
    const merged = mergeArrays(array1, array2);

     
    print(`Number: ${num}`);
    print(`Fibonacci: ${fibSequence}`);
    print(`Merged Array: ${merged}`);
  }
}

processAsyncIterable();
