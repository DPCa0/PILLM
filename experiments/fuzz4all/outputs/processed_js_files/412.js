class Observer {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(event, fn) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(fn);
  }

  emit(event, data) {
    const fns = this.subscribers.get(event) || [];
    fns.forEach(fn => fn(data));
  }
}

function debounce(fn, delay) {
  let timeoutID;
  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();
const observer = new Observer();
const logData = data => print(`Received data for id ${data.id}:`, data);

observer.subscribe('data', debounce(logData, 300));

async function fetchAndLog(url) {
  try {
    const data = await fetchData(url);
    observer.emit('data', { id: idGen.next().value, ...data });
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

fetchAndLog('https://jsonplaceholder.typicode.com/posts/1');
fetchAndLog('https://jsonplaceholder.typicode.com/posts/2');
fetchAndLog('https://jsonplaceholder.typicode.com/posts/3');
