const fetchJsonData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    (this.events[event] || (this.events[event] = [])).push(listener);
    return this;
  }

  emit(event, ...args) {
    (this.events[event] || []).slice().forEach(lsn => lsn(...args));
  }
}

const processData = (data) => {
  return data
    .filter(({ age }) => age >= 18)
    .map(({ name, age }) => ({ name, age }))
    .reduce((acc, { name }) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});
};

const eventEmitter = new EventEmitter();

eventEmitter.on('dataProcessed', (result) => {
  print('Processed Data:', result);
});

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const jsonData = await fetchJsonData(url);
  if (jsonData) {
    const result = processData(jsonData);
    eventEmitter.emit('dataProcessed', result);
  }
})();
