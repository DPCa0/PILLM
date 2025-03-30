 

 
const secretMethod = Symbol('secret');

 
const handler = {
  get(target, prop) {
    print(`Accessing property: ${prop.toString()}`);
    if (prop === secretMethod) {
      return target[prop]();
    }
    return Reflect.get(...arguments);
  }
};

 
class ComplexClass {
  constructor(data) {
    this.data = data;
    return new Proxy(this, handler);
  }
  
   
  async fetchData() {
    print('Fetching data...');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this[secretMethod]());
      }, 1000);
    });
  }
  
   
  [secretMethod]() {
    return `Secret Data: ${this.data}`;
  }
}

 
(async () => {
  const instance = new ComplexClass('Confidential');
  const data = await instance.fetchData();
  print(data);
})();
