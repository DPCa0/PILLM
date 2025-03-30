class Observer {
  constructor() {
    this.observers = new Map();
  }

  subscribe(event, fn) {
    if (!this.observers.has(event)) {
      this.observers.set(event, []);
    }
    this.observers.get(event).push(fn);
  }

  emit(event, data) {
    const handlers = this.observers.get(event) || [];
    handlers.forEach(handler => handler(data));
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

(async () => {
  const observer = new Observer();
  
  observer.subscribe('dataReceived', data => {
    print('Data received:', data);
  });
  
  observer.subscribe('dataError', error => {
    console.error('Error:', error);
  });

  try {
    const data = await fetchData('https://api.example.com/data');
    observer.emit('dataReceived', data);
  } catch (error) {
    observer.emit('dataError', error);
  }
})();
