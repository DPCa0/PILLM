class DataStore {
  #data;
  
  constructor() {
    this.#data = new Map();
  }
  
  setItem(key, value) {
    this.#data.set(key, value);
  }
  
  getItem(key) {
    return this.#data.get(key);
  }
  
  removeItem(key) {
    this.#data.delete(key);
  }
  
  get allData() {
    return [...this.#data.entries()];
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
}

function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

(async () => {
  const store = new DataStore();
  try {
    const data = await fetchData('https://api.example.com/data');
    store.setItem('apiData', data);
  } catch (err) {
    console.error(err);
  }

  for (let num of fibonacci(10)) {
    store.setItem(`fibonacci_${num}`, num);
  }

  const allItems = store.allData;
  print('All Data from Store:', allItems);
})();
