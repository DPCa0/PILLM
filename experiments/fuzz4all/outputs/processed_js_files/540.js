class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  
  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

const observable = new Observable();

observable.subscribe(data => print("First subscriber:", data));
const unsubscribe = observable.subscribe(data => print("Second subscriber:", data));

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    observable.notify(data);
  } catch (error) {
    console.error("Fetching error:", error);
  } finally {
    unsubscribe();
  }

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/2');
    observable.notify(data);
  } catch (error) {
    console.error("Fetching error:", error);
  }
})();
