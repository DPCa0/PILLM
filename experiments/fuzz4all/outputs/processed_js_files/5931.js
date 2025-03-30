 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing ${prop}`);
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling ${prop} with arguments: ${JSON.stringify(args)}`);
        return target[prop].apply(this, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
};

 
const complexObject = new Proxy({
  name: "Complex Object",
  data: [1, 2, 3, 4],
  greet() {
    return `Hello from ${this.name}`;
  },
  async fetchData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.data.map(x => x * 2));
      }, 1000);
    });
  }
}, handler);

 
(async () => {
  const { randomUUID } = await import('crypto');
  
  print(complexObject.greet());
  
  const doubledData = await complexObject.fetchData();
  print(`Doubled data: ${doubledData}`);

  print(`Random UUID: ${randomUUID()}`);
  
   
  const description = complexObject?.description ?? 'No description available';
  print(`Description: ${description}`);
})();
