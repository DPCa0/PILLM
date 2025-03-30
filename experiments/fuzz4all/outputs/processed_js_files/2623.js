class Observable {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
    return {
      unsubscribe: () => this.observers.delete(observer)
    };
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  const observable = new Observable();

  const subscription = observable.subscribe(data => {
    print('Received Data:', data);
  });

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    observable.notify(data);
  } catch (error) {
    console.error('Fetch Error:', error);
  }

  await delay(2000);
  subscription.unsubscribe();

  print('Unsubscribed and exiting...');
};

main();
