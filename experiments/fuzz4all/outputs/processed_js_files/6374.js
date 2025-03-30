class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(subscriber) {
    this.subscribers.add(subscriber);
  }
  
  unsubscribe(subscriber) {
    this.subscribers.delete(subscriber);
  }
  
  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}

class DataStore {
  constructor() {
    this.data = new Map();
    this.observable = new Observable();
  }
  
  set(key, value) {
    if (this.data.get(key) !== value) {
      this.data.set(key, value);
      this.observable.notify({ [key]: value });
    }
  }
  
  get(key) {
    return this.data.get(key);
  }
  
  subscribe(subscriber) {
    this.observable.subscribe(subscriber);
  }
  
  unsubscribe(subscriber) {
    this.observable.unsubscribe(subscriber);
  }
}

const dataStore = new DataStore();

dataStore.subscribe(console.log);

dataStore.set('name', 'Alice');
dataStore.set('age', 30);

async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  dataStore.set('fetchedData', data);
}

fetchData().catch(console.error);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  print('Before delay');
  await delay(2000);
  print('After delay');
  dataStore.set('status', 'Updated');
})();
