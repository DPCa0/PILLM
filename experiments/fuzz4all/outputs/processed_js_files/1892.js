 
const myModule = (() => {
   
  const _counter = Symbol('counter');

  class Counter {
    constructor() {
      this[_counter] = 0;
    }

    increment() {
      this[_counter]++;
    }

    decrement() {
      this[_counter]--;
    }

    get count() {
      return this[_counter];
    }
  }

   
  const handler = {
    get(target, property) {
      if (property in target) {
        print(`Getting property ${property}: ${target[property]}`);
        return target[property];
      }
      return `Property ${property} not found`;
    },
    set(target, property, value) {
      print(`Setting property ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  };

   
  const counterInstance = new Counter();
  const proxyCounter = new Proxy(counterInstance, handler);

  return {
    increment: () => Reflect.apply(proxyCounter.increment, proxyCounter, []),
    decrement: () => Reflect.apply(proxyCounter.decrement, proxyCounter, []),
    getCount: () => Reflect.get(proxyCounter, 'count')
  };
})();

 
myModule.increment();
myModule.increment();
print(`Count is: ${myModule.getCount()}`);
myModule.decrement();
print(`Count is: ${myModule.getCount()}`);
