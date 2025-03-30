class AsyncQueue {
  #queue = [];
  #pending = false;
  
  async enqueue(task) {
    this.#queue.push(task);
    if (!this.#pending) this.#dequeue();
  }
  
  async #dequeue() {
    if (this.#queue.length === 0) {
      this.#pending = false;
      return;
    }
    this.#pending = true;
    const task = this.#queue.shift();
    await task().catch(console.error);
    this.#dequeue();
  }
}

const fetchWithRetry = (url, retries = 3) => async () => {
  while (retries > 0) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      print('Data:', data);
      return;
    } catch (err) {
      retries--;
      if (retries === 0) throw err;
      print(`Retrying...(${3 - retries})`);
    }
  }
};

(async () => {
  const queue = new AsyncQueue();

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  urls.forEach(url => queue.enqueue(fetchWithRetry(url)));

  print('All tasks enqueued');
})();
