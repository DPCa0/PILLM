const complexFeatureDemo = async () => {
   
  const uniqueKey = Symbol('uniqueKey');

   
  const targetObject = {};
  const handler = {
    get: (obj, prop) => (prop in obj ? obj[prop] : `Property '${prop}' not found!`)
  };
  const proxyObject = new Proxy(targetObject, handler);

   
  class AdvancedFeatures {
    #privateField = 42;  
    static staticMethod() {
      return 'I am a static method!';
    }

    constructor(value) {
      this[uniqueKey] = value;
    }

    getPrivateField() {
      return this.#privateField;
    }

    getUniqueKey() {
      return this[uniqueKey];
    }
  }

   
  const asyncTask1 = new Promise((resolve) => setTimeout(() => resolve(1), 100));
  const asyncTask2 = new Promise((resolve) => setTimeout(() => resolve(2), 200));
  const asyncTask3 = new Promise((resolve) => setTimeout(() => resolve(3), 300));

  const results = await Promise.all([asyncTask1, asyncTask2, asyncTask3]);

   
  const advancedInstance = new AdvancedFeatures('Special Value');
  print(`Static Method Call: ${AdvancedFeatures.staticMethod()}`);
  print(`Private Field: ${advancedInstance.getPrivateField()}`);
  print(`Unique Key Value: ${advancedInstance.getUniqueKey()}`);
  print(`Promise Results: ${results.join(', ')}`);

   
  const nestedObject = { a: { b: { c: null } } };
  print(`Optional Chaining: ${nestedObject.a?.b?.c ?? 'Value is null or undefined'}`);

   
  proxyObject.someProperty = 'Hello, Proxy!';
  print(proxyObject.someProperty);  
  print(proxyObject.anotherProperty);  
};

complexFeatureDemo();
