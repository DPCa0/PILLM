class AsyncIterable {
  constructor(max) {
    this.max = max;
  }

  [Symbol.asyncIterator]() {
    let i = 0;
    const max = this.max;
    return {
      async next() {
        await new Promise(resolve => setTimeout(resolve, 100));  
        return i < max ? { value: i++, done: false } : { done: true };
      }
    };
  }
}

async function* filterAsync(iterable, predicate) {
  for await (const value of iterable) {
    if (await predicate(value)) {
      yield value;
    }
  }
}

async function* mapAsync(iterable, transform) {
  for await (const value of iterable) {
    yield transform(value);
  }
}

async function main() {
  const asyncNumbers = new AsyncIterable(10);

  const isEven = async num => num % 2 === 0;
  const double = num => num * 2;

  const evenNumbers = filterAsync(asyncNumbers, isEven);
  const doubledNumbers = mapAsync(evenNumbers, double);

  for await (const num of doubledNumbers) {
    print(num);
  }
}

main().catch(console.error);
