class Observable {
  constructor(initialValue) {
    this._value = initialValue;
    this._listeners = new Set();
  }

  subscribe(listener) {
    this._listeners.add(listener);
    listener(this._value);
    return () => this._listeners.delete(listener);
  }

  notify(newValue) {
    this._value = newValue;
    for (let listener of this._listeners) {
      listener(newValue);
    }
  }
}

function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return await response.json();
}

const dataObservable = new Observable(null);

dataObservable.subscribe(data => {
  print('Data updated:', data);
});

const debouncedFetchData = debounce(async (url) => {
  try {
    const data = await fetchData(url);
    dataObservable.notify(data);
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}, 300);

debouncedFetchData('https://jsonplaceholder.typicode.com/todos/1');
debouncedFetchData('https://jsonplaceholder.typicode.com/todos/2');
debouncedFetchData('https://jsonplaceholder.typicode.com/todos/3');
