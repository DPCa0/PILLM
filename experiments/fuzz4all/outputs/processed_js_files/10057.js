 
const { EventEmitter } = require('events');
const axios = require('axios');

 
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    print(`Data fetched: ${response.data}`);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

 
function* messageGenerator() {
  yield "First message";
  yield "Second message";
  yield "Third message";
}

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(...arguments);
  },
};

const targetObject = { secret: "Proxies are cool!" };
const proxyObject = new Proxy(targetObject, handler);

 
const emitter = new EventEmitter();

 
function complexInteraction() {
   
  emitter.on('data', (url) => {
    fetchData(url);
    print("Event 'data' processed.");
  });

   
  print(`Accessing proxy: ${proxyObject.secret}`);

   
  const messages = messageGenerator();
  for (let message of messages) {
    print(`Generated message: ${message}`);
  }

   
  emitter.emit('data', 'https://jsonplaceholder.typicode.com/posts/1');
}

 
complexInteraction();
