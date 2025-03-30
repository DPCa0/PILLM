(async function complexJS() {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
   
  const targetObject = { message: 'Hello, world!', count: 0 };
  const handler = {
    get(target, prop) {
      print(`Accessed property ${prop}`);
      return prop in target ? target[prop] : 'Property not found';
    },
    set(target, prop, value) {
      print(`Setting property ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  };
  const proxyObject = new Proxy(targetObject, handler);
  
   
  const logMessages = (...messages) => {
    print(...messages);
  };

   
  const messageMap = new Map();
  const uniqueMessages = new Set();
  messageMap.set(proxyObject.message, 1);
  uniqueMessages.add(proxyObject.message);

   
  async function* asyncGenerator() {
    for (let i = 0; i < 5; i++) {
      await delay(100);
      yield `Count: ${i}`;
    }
  }

   
  for await (const value of asyncGenerator()) {
    proxyObject.count++;
    logMessages(value, proxyObject.message, `Access Count: ${proxyObject.count}`);
  }

   
  const { message = 'Default Message', count = 0 } = proxyObject;

  logMessages(`Final message: ${message}`, `Final count: ${count}`);
})();
