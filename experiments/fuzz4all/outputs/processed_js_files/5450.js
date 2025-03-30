 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
  for (let i = 1; i <= 3; i++) {
    await delay(1000);
    yield i * 2;  
  }
}

 
const logHandler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return target[property];
  }
};

 
class ComplexClass {
  #privateValue = 42;  

  constructor(value) {
    this.publicValue = value;
  }

  async getAsyncValues() {
    const proxy = new Proxy(this, logHandler);
    let values = [];
    for await (let num of asyncGenerator()) {
      values.push(num + proxy.publicValue + proxy.#privateValue);
    }
    return values;
  }
}

 
(async () => {
  const instance = new ComplexClass(5);
  const results = await instance.getAsyncValues();
  print('Final Results:', results);
})();
