 
class Person {
  #name;
  
  constructor(name) {
    this.#name = name;
  }

  greet() {
    return `Hello, ${this.#name}!`;
  }
}

 
const personProxyHandler = {
  get: (target, property) => {
    const origMethod = target[property];
    if (typeof origMethod === 'function') {
      return function(...args) {
        print(`Calling method: ${property}`);
        return origMethod.apply(this, args);
      };
    }
    return origMethod;
  }
};

 
const person = new Person('Alice');
const proxiedPerson = new Proxy(person, personProxyHandler);

 
(async () => {
  try {
    const module = await import('./someModule.js');  
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => resolve('Promise resolved after delay'), 2000);
    });

    print(proxiedPerson.greet());  
    print(result);
    module.someFunction();  
  } catch (error) {
    console.error('Error:', error);
  }
})();

Ensure there is a `someModule.js` file in the same directory with a `someFunction` to see the full effect.