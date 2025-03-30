class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  subscribe(fn) {
    this.subscribers.add(fn);
  }
  unsubscribe(fn) {
    this.subscribers.delete(fn);
  }
  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

const observable = new Observable();

const subscriber1 = data => print(`Subscriber 1 received: ${data}`);
const subscriber2 = data => print(`Subscriber 2 received: ${data}`);

observable.subscribe(subscriber1);
observable.subscribe(subscriber2);

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    observable.notify(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  const processed = data.map(item => ({
    ...item,
    calculatedValue: item.value * 2
  }));
  console.table(processed);
};

observable.subscribe(processData);

fetchData('https://jsonplaceholder.typicode.com/posts').catch(error => console.error(error));
