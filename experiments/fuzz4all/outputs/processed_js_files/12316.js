class AsyncIterable {
  constructor(data) {
    this.data = data;
  }

  [Symbol.asyncIterator]() {
    let index = 0;
    const data = this.data;
    return {
      async next() {
        if (index < data.length) {
          const value = await new Promise(resolve => 
            setTimeout(() => resolve(data[index++]), 100)
          );
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

async function* fibonacci(n) {
  let [a, b] = [0, 1];
  while (n--) {
    await new Promise(resolve => setTimeout(resolve, 50));  
    yield a;
    [a, b] = [b, a + b];
  }
}

(async () => {
  const asyncData = new AsyncIterable(['A', 'B', 'C']);
  for await (const value of asyncData) {
    print('Async Data:', value);
  }

  print('Fibonacci Sequence:');
  for await (const num of fibonacci(5)) {
    print(num);
  }
})();

const pipe =
  (...fns) =>
  (input) =>
    fns.reduce((chain, fn) => chain.then(fn), Promise.resolve(input));

const toUpperCase = async (str) => str.toUpperCase();
const exclaim = async (str) => `${str}!`;
const print = async (str) => print(str);

const shout = pipe(toUpperCase, exclaim, print);
shout('hello world');
