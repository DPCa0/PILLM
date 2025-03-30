 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* delayedNumbers() {
  for (let i = 1; i <= 5; i++) {
    await delay(1000);  
    yield i;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Accessed property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new Error(`Property "${prop}" does not exist.`);
    }
  }
};

const targetObject = { a: 10, b: 20, c: 30 };
const proxiedObject = new Proxy(targetObject, handler);

(async function execute() {
  print('Starting generator:');
  for await (const number of delayedNumbers()) {
    print(`Generated number: ${number}`);
  }

  print('\nAccessing proxy properties:');
  try {
    print(`a: ${proxiedObject.a}`);
    print(`b: ${proxiedObject.b}`);
    print(`c: ${proxiedObject.c}`);
     
     
  } catch (error) {
    console.error(error.message);
  }
})();
