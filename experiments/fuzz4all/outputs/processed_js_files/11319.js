 

 
const handler = {
  get: function(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling method ${prop} with arguments: ${JSON.stringify(args)}`);
        return Reflect.apply(target[prop], receiver, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const target = {
  async *fetchData(urls) {
    for (const url of urls) {
      yield await fetch(url).then(response => response.json());
    }
  }
};

 
const proxy = new Proxy(target, handler);

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2'
  ];
  
  for await (const data of proxy.fetchData(urls)) {
    print(data);
  }
})();
