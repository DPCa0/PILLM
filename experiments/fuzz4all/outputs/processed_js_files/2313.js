class AsyncIterator {
  constructor(items) {
    this.items = items;
    this.index = 0;
  }

  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.index < this.items.length) {
          return Promise.resolve({
            value: this.items[this.index++],
            done: false
          });
        } else {
          return Promise.resolve({ done: true });
        }
      }
    };
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const items = ['Hello', 'world', 'from', 'an', 'async', 'iterator!'];
  const asyncIterator = new AsyncIterator(items);

  for await (const item of asyncIterator) {
    await delay(500);
    print(item);
  }

  const obj = {
    *[Symbol.iterator]() {
      yield* items;
    }
  };

  print('Synchronous loop:');
  for (const item of obj) {
    print(item.toUpperCase());
  }

  const promises = items.map(async item => {
    await delay(1000);
    return item.split('').reverse().join('');
  });

  print('Reversed words after Promise.all:');
  const reversed = await Promise.all(promises);
  print(reversed.join(' '));
})();
