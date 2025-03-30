class Observable {
  constructor() {
    this.observers = new Set();
  }
  
  subscribe(observer) {
    this.observers.add(observer);
  }
  
  unsubscribe(observer) {
    this.observers.delete(observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const observable = new Observable();

const observer1 = (data) => print(`Observer 1: ${data}`);
const observer2 = (data) => print(`Observer 2: ${data}`);

observable.subscribe(observer1);
observable.subscribe(observer2);

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const simulateAsyncData = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    observable.notify(data.title);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
simulateAsyncData();

 
const target = { a: 1, b: 2 };
const handler = {
  get(obj, prop) {
    print(`Property ${prop} was accessed`);
    return prop in obj ? obj[prop] : 'default';
  }
};
const proxy = new Proxy(target, handler);

print(proxy.a);  
print(proxy.c);  
