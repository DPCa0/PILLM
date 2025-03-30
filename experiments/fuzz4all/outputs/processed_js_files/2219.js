 

 
const _data = Symbol('data');

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

class Complex {
  constructor(initialData) {
     
    this[_data] = new Proxy({ value: initialData }, handler);
  }

   
  *dataGenerator() {
    while (this[_data].value < 10) {
      yield this[_data].value++;
    }
  }

   
  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this[_data].value += 10;
        resolve(this[_data].value);
      }, 1000);
    });
  }
}

 
(async () => {
  const complex = new Complex(1);

  for (const value of complex.dataGenerator()) {
    print(`Generated value: ${value}`);
  }

  const fetchedData = await complex.fetchData();
  print(`Fetched data: ${fetchedData}`);
})();
