class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async enqueue(promiseFactory) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promiseFactory, resolve, reject });
      if (!this.processing) {
        this.process();
      }
    });
  }

  async process() {
    this.processing = true;
    while (this.queue.length > 0) {
      const { promiseFactory, resolve, reject } = this.queue.shift();
      try {
        const result = await promiseFactory();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }
    this.processing = false;
  }
}

async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const signal = controller.signal;
  
  const fetchPromise = fetch(url, { signal });
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      controller.abort();
      reject(new Error('Request timed out'));
    }, ms)
  );

  return Promise.race([fetchPromise, timeoutPromise]);
}

 
const apiQueue = new AsyncQueue();

async function fetchData(url) {
  try {
    const response = await apiQueue.enqueue(() => fetchWithTimeout(url, 5000));
    const data = await response.json();
    print(data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
}

fetchData('https://jsonplaceholder.typicode.com/todos/1');
fetchData('https://jsonplaceholder.typicode.com/todos/2');
fetchData('https://jsonplaceholder.typicode.com/todos/3');
