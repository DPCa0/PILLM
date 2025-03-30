class AsyncIterable {
  constructor(max) {
    this.max = max;
    this.current = 0;
  }

  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.current < this.max) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ value: this.current++, done: false });
            }, 100);
          });
        } else {
          return Promise.resolve({ done: true });
        }
      }
    };
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);

    print('Async Iterable Sequence:');
    for await (const num of new AsyncIterable(5)) {
      print(num);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
