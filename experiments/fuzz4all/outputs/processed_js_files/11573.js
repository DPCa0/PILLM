 
const EventEmitter = require('events');

 
async function fetchData() {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Hello, Advanced JavaScript!' });
    }, 1000);
  });
}

 
class ComplexSystem extends EventEmitter {
   
  constructor() {
    super();
    this.#setupListeners();
  }

   
  #setupListeners() {
     
    this.on('dataReady', async () => {
      try {
        const data = await fetchData();
        print(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

     
    this.on('errorOccurred', (error) => {
      console.error('An error occurred:', error);
    });
  }

   
  start() {
    this.emit('dataReady');
  }
}

 
const handler = {
  get(target, property, receiver) {
    print(`Accessing property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property: ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
const complexSystem = new Proxy(new ComplexSystem(), handler);

 
complexSystem.start();
