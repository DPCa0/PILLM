 
const complexFunction = (() => {
   
  const privateData = new WeakMap();

  class ComplexClass {
    constructor(name) {
      privateData.set(this, { secret: `Hello, ${name}!` });
      this.name = name;
    }

     
    get data() {
      return new Proxy(privateData.get(this), {
        get(target, prop) {
          if (prop in target) {
            return target[prop];
          } else {
            throw new Error(`Property ${prop} does not exist.`);
          }
        },
      });
    }

     
    *dataGenerator() {
      yield* [1, 2, 3];
    }

    async printData() {
      for await (const val of this.dataGenerator()) {
        print(`Value: ${val}`);
      }
    }

     
    static greet(strings, ...values) {
      return strings.reduce((result, str, i) => `${result}${str}${values[i] || ''}`, '');
    }

    sayHello() {
      print(ComplexClass.greet`Message: ${this.data.secret}`);
    }
  }

  return ComplexClass;
})();

 
const instance = new complexFunction('JavaScript');
instance.sayHello();  
instance.printData();  
