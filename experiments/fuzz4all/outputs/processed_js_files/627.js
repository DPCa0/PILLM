class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  return data.map(item => ({
    ...item,
    fullName: `${item.firstName} ${item.lastName}`,
    ageCategory: item.age > 18 ? 'Adult' : 'Minor',
  }));
};

(async () => {
  const eventEmitter = new EventEmitter();
  const dataUrl = 'https://jsonplaceholder.typicode.com/users';

  eventEmitter.on('dataFetched', (data) => {
    const processedData = processData(data);
    print('Processed Data:', processedData);
  });

  try {
    const data = await fetchData(dataUrl);
    eventEmitter.emit('dataFetched', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
