 
const { EventEmitter } = require('events');

 
class MyEventEmitter extends EventEmitter {
  async emitAsync(event, ...args) {
    for (const listener of this.listeners(event)) {
      await listener(...args);
    }
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    throw new Error(`Property "${prop}" does not exist.`);
  }
};

 
async function fetchData(api) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (api === 'validAPI') {
        resolve({ data: 'Sample Data' });
      } else {
        reject('Invalid API Endpoint');
      }
    }, 1000);
  });
}

 
(async () => {
   
  const proxyObj = new Proxy({ data: 'Default Data' }, handler);
  
  const emitter = new MyEventEmitter();
  
   
  emitter.on('dataFetched', async (data) => {
    print('Processing Data: ', data);
     
    const uniqueData = new Set(data.split(' '));
    print('Transformed Data: ', [...uniqueData].join(' '));
  });

  try {
     
    const apiData = (await fetchData('validAPI'))?.data ?? 'No Data Retrieved';
    print('API Data: ', apiData);

     
    await emitter.emitAsync('dataFetched', apiData);
    
     
    print('Accessing Proxy Object Data: ', proxyObj.data);
  } catch (error) {
    console.error('Error: ', error);
  }
})();
