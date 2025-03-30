const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

const dataObservable = new Observable();
dataObservable.subscribe(data => print('Subscriber 1:', data));
dataObservable.subscribe(data => print('Subscriber 2:', data));

(async function main() {
  const apiUrl = 'https://api.example.com/data';
  const fetchedData = await fetchData(apiUrl);
  if (fetchedData) {
    dataObservable.notify(fetchedData);
  }

  await delay(2000);
  print('This message is delayed by 2 seconds');
})();
