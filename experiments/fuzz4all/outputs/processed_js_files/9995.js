 
(async () => {
  const module = await import('https://unpkg.com/lodash-es@4.17.21/lodash.min.js');
  const _ = module.default;

   
  const target = {
    message: 'Hello, world!'
  };

  const handler = {
    get: (obj, prop) => {
      print(`Getting ${prop}`);
      return Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(obj, prop, value);
    }
  };

  const proxy = new Proxy(target, handler);

   
  const callbacks = new Set();

  function registerCallback(cb) {
    callbacks.add(cb);
  }

  function triggerCallbacks() {
    callbacks.forEach(cb => cb(proxy.message));
  }

   
  function customizeMessage({ greeting, ...rest }) {
    return `${greeting}, ${_.join(Object.values(rest), ' ')}!`;
  }

  registerCallback(msg => print(customizeMessage({ greeting: 'Hi', name: 'Alice', message: msg })));

  proxy.message = 'World!';  
  triggerCallbacks();
})();
