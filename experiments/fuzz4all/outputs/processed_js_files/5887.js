 
const uniqueKey = Symbol('unique');

 
class Advanced {
  #privateField = 'This is a private field';
  
  #privateMethod() {
    return `Accessing: ${this.#privateField}`;
  }

   
  [uniqueKey]() {
    return 'This is a method with a unique key';
  }

   
  publicMethod() {
    return this.#privateMethod();
  }

   
  async demonstrateAsync() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Promise resolved after 1 second'), 1000);
    });

    const result = await promise;
    return result;
  }

   
  *generatorFunction() {
    yield 'First yield';
    yield 'Second yield';
    return 'Generator complete';
  }
}

 
const { publicMethod, ...rest } = new Advanced();
print(publicMethod());  

 
print(rest[uniqueKey]()); 

 
const obj = { nested: { value: 42 } };
print(obj.nested?.value ?? 'No value');

 
const asyncDemo = new Advanced();
asyncDemo.demonstrateAsync().then(console.log);

 
const generator = asyncDemo.generatorFunction();
print(generator.next().value);  
print(generator.next().value);  
print(generator.next().value);  
