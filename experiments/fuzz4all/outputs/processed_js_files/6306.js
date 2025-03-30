 

 
const handler = {
  get(target, property, receiver) {
     
    if (property in target) {
      return Reflect.get(...arguments);
    } else {
      throw new ReferenceError(`Property "${property}" does not exist.`);
    }
  }
};

 
const target = {
  message: 'Hello, complex world!',
  value: 42
};

 
const proxy = new Proxy(target, handler);

 
async function asyncExample() {
  function promiseFunction() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(proxy.message);
      }, 1000);
    });
  }
  
   
  const message = await promiseFunction();
  
  print(message);
}

 
function* generatorFunction() {
  yield proxy.value;
  yield 'Generator Resumed!';
}

 
asyncExample();

 
const generator = generatorFunction();
print(generator.next().value);  
print(generator.next().value);  

 
try {
  print(proxy.nonExistentProperty);
} catch (error) {
  console.error(error.message);  
}
