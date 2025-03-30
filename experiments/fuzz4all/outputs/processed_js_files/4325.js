class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(callback) {
    this.subscribers.add(callback);
  }
  
  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }
  
  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

class ReactiveValue {
  constructor(initialValue) {
    this.value = initialValue;
    this.observable = new Observable();
  }
  
  set(newValue) {
    this.value = newValue;
    this.observable.notify(this.value);
  }
  
  get() {
    return this.value;
  }
  
  subscribe(callback) {
    this.observable.subscribe(callback);
  }
}

 
const user = {
  name: 'Alice',
  age: 25,
};

const proxyUser = new Proxy(user, {
  get(target, property) {
    print(`Getting ${property}: ${target[property]}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
});

 
async function fetchData(url) {
  print('Fetching data...');
  const response = await fetch(url);
  const data = await response.json();
  print('Data fetched:', data);
  return data;
}

(async () => {
   
  const reactive = new ReactiveValue(10);
  reactive.subscribe((val) => print(`Reactive value changed: ${val}`));
  reactive.set(20);

   
  print(proxyUser.name);
  proxyUser.age = 30;

   
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
