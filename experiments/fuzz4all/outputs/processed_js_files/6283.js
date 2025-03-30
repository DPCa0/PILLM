class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async enqueue(promiseFunc) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promiseFunc, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing) return;
    if (this.queue.length === 0) return;

    this.processing = true;
    const { promiseFunc, resolve, reject } = this.queue.shift();

    try {
      const result = await promiseFunc();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.processing = false;
      this.process();
    }
  }
}

const apiRequest = (url) => async () => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

(async () => {
  const queue = new AsyncQueue();
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
  ];

  const results = await Promise.all(urls.map((url) => queue.enqueue(apiRequest(url))));

  print(results);
})();
