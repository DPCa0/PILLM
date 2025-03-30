 
const { EventEmitter } = require('events');

 
const loggerProxy = (target) => {
  return new Proxy(target, {
    get(obj, prop) {
      print(`Getting property ${prop}`);
      return obj[prop];
    },
    set(obj, prop, value) {
      print(`Setting property ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    },
  });
};

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Fetched data');
    }, 1000);
  });
}

 
function* taskGenerator(tasks) {
  for (let task of tasks) {
    yield task();
  }
}

 
(async () => {
  const dataEmitter = new EventEmitter();
  const logger = loggerProxy(dataEmitter);

  logger.on('data', async (data) => {
    print(`Data received: ${data}`);
  });

  const tasks = [fetchData, fetchData, fetchData];
  const taskIter = taskGenerator(tasks);

  for (let task of taskIter) {
    const data = await task;
    logger.emit('data', data);
  }
})();
