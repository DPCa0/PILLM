 
const { EventEmitter } = require('events');

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
  });
}

 
const dataHandler = {
  get(target, prop) {
    print(`Getting ${prop}`);
    return prop in target ? target[prop] : null;
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const dataStore = new Proxy({}, dataHandler);

 
const eventBus = new EventEmitter();

 
eventBus.on('dataFetched', (data) => {
  print('Event received: dataFetched');
  dataStore.latest = data;
  print(`Updated dataStore: ${JSON.stringify(dataStore)}`);
});

 
(async () => {
  print('Fetching data...');
  const result = await fetchData();
  eventBus.emit('dataFetched', result.data);
})();
