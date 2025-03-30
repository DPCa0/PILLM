class DataStore {
  static #instance;
  #data;

  constructor() {
    if (DataStore.#instance) {
      return DataStore.#instance;
    }
    this.#data = new Map();
    DataStore.#instance = this;
  }

  static getInstance() {
    if (!DataStore.#instance) {
      DataStore.#instance = new DataStore();
    }
    return DataStore.#instance;
  }

  set(key, value) {
    this.#data.set(key, value);
  }

  get(key) {
    return this.#data.get(key);
  }

  delete(key) {
    this.#data.delete(key);
  }

  getAll() {
    return [...this.#data.entries()];
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

const throttle = (fn, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn(...args);
    }
  };
};

const processData = throttle(async (url) => {
  try {
    const data = await fetchData(url);
    const store = DataStore.getInstance();
    store.set(url, data);
    print(`Data stored for ${url}:`, data);
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
  }
}, 2000);

const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3',
];

urls.forEach(url => processData(url));
