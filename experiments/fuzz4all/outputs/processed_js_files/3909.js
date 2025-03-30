 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop} from target`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value} on target`);
    return Reflect.set(...arguments);
  }
};

 
const targetObject = {
  name: 'Alice',
  age: 30
};

 
const proxy = new Proxy(targetObject, handler);

 
class AsyncGenerator {
  constructor(data) {
    this.data = data;
  }

  async *fetchData() {
    for (const item of this.data) {
       
      await new Promise(resolve => setTimeout(resolve, 100));
      yield item;
    }
  }
}

 
(async () => {
  proxy.name = 'Bob';
  print(proxy.name);

  const ag = new AsyncGenerator([1, 2, 3, 4, 5]);
  for await (const value of ag.fetchData()) {
    print(`Async value received: ${value}`);
  }
})();
