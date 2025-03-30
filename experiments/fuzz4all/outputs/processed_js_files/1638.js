const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

class Observer {
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

const processData = (data) => {
  const { title, body } = data;
  print(`Title: ${title}\nBody: ${body}`);
};

(async () => {
  const observer = new Observer();

  observer.subscribe(processData);

  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  if (data) {
    observer.notify(data);
  }
})();
