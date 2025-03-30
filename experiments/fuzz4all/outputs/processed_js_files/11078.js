class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

function fetchData(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

async function asyncWrapper(observable, url) {
  try {
    const data = await fetchData(url);
    observable.notify(data);
  } catch (error) {
    observable.notify({ error: error.message });
  }
}

const dataObservable = new Observable();

dataObservable.subscribe(debounce(data => {
  if (data.error) {
    console.error('Error fetching data:', data.error);
  } else {
    print('Fetched data:', data);
  }
}, 500));

const url = 'https://jsonplaceholder.typicode.com/posts';
asyncWrapper(dataObservable, url);
