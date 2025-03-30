class Observable {
  constructor() {
    this.observers = new Set();
  }
  subscribe(fn) {
    this.observers.add(fn);
  }
  unsubscribe(fn) {
    this.observers.delete(fn);
  }
  notify(data) {
    this.observers.forEach(fn => fn(data));
  }
}

const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Attempt ${i + 1} failed`);
      return await response.json();
    } catch (error) {
      console.error(error);
      if (i === retries - 1) throw error;
    }
  }
};

const urlObserver = new Observable();

urlObserver.subscribe(data => print('Observer 1: ', data));
urlObserver.subscribe(data => print('Observer 2: ', data));
urlObserver.subscribe(async data => {
  try {
    const result = await fetchWithRetry(data.url);
    print('Fetched data:', result);
  } catch (error) {
    console.error('Fetching failed:', error);
  }
});

urlObserver.notify({ url: 'https://jsonplaceholder.typicode.com/posts/1' });

const timeoutPromise = (timeout) => new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout));

const fetchWithTimeout = async (url, timeout = 5000) => {
  try {
    const response = await Promise.race([
      fetch(url),
      timeoutPromise(timeout)
    ]);
    return response.ok ? await response.json() : Promise.reject(new Error('Failed to fetch'));
  } catch (error) {
    console.error('Error:', error);
  }
};

(async () => {
  const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/2', 3000);
  print('Data fetched with timeout:', data);
})();
