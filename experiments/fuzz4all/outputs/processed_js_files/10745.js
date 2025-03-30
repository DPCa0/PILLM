 
const complexObject = {
  name: 'Complex Object',
  data: [1, 2, 3, 4, 5],
  nested: {
    a: 10,
    b: 20,
    calculateSum() {
      return this.a + this.b;
    },
  },
   
  *dataIterator() {
    for (const item of this.data) {
      yield item * 2;
    }
  },
   
  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Fetched Data');
      }, 1000);
    });
  },
};

 
const proxy = new Proxy(complexObject, {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new Error(`Property ${property} does not exist`);
    }
  },
  set(target, property, value) {
    if (property === 'name' && typeof value !== 'string') {
      throw new TypeError('Name must be a string');
    }
    target[property] = value;
    return true;
  },
});

 
Reflect.set(proxy, 'name', 'Updated Complex Object');

try {
   
  print(proxy.nested?.calculateSum() ?? 'No Sum Available');

   
  for (const value of proxy.dataIterator()) {
    print(value);
  }

   
  (async () => {
    const result = await proxy.fetchData();
    print(result);
  })();
} catch (error) {
  console.error(error.message);
}
