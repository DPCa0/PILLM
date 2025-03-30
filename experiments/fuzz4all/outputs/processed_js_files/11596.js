class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  print('Fetching data...');
  await delay(2000);
  print('Data fetched');
  return { id: 1, name: 'Sample Data' };
}

 
(async function() {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('dataReceived', data => {
    print(`Event received with data:`, data);
  });

  try {
    const data = await fetchData();
    eventEmitter.emit('dataReceived', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
