class AsyncIterable {
  constructor(limit) {
    this.limit = limit;
  }
  
  [Symbol.asyncIterator]() {
    let i = 0;
    const limit = this.limit;
    return {
      next() {
        if (i < limit) {
          return new Promise(resolve => {
            setTimeout(() => resolve({ value: i++, done: false }), 100);
          });
        }
        return Promise.resolve({ done: true });
      }
    };
  }
}

async function* generator() {
  for await (let num of new AsyncIterable(5)) {
    yield num * num;
  }
}

(async () => {
  const results = [];
  for await (let squared of generator()) {
    print(squared);
    results.push(squared);
  }

  const sum = results.reduce((acc, num) => acc + num, 0);
  
  print(`Sum of squares: ${sum}`);
})();
