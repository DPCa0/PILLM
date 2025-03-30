const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

(async () => {
  const observable = new Observable();
  const apiData = await getData('https://api.example.com/data');

  observable.subscribe(data => print('Subscriber 1:', data));
  observable.subscribe(data => print('Subscriber 2:', data));

  const processApiData = debounce((data) => {
    print('Processing API data:', data);
    observable.notify(data);
  }, 2000);

  processApiData(apiData);
})();
