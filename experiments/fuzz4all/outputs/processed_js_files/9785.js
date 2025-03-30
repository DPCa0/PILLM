 
const asyncOperation = (delay) => new Promise((resolve) => setTimeout(() => resolve(`Completed in ${delay}ms`), delay));

 
const runAsyncTasks = async () => {
  const delays = [300, 200, 100];
  print('Starting async tasks...');

   
  const results = await Promise.all(delays.map(async (delay) => {
    try {
       
      const { dynamicFunction } = await import('./dynamicModule.js');
      const result = await asyncOperation(delay);
      return dynamicFunction(result);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }));

  print('All tasks finished:', results);
};

 
 

runAsyncTasks();

 
const handler = {
  get: (target, prop) => prop in target ? target[prop] : 'Property does not exist',
  set: (target, prop, value) => {
    print(`Setting value ${value} to ${prop}`);
    target[prop] = value;
    return true;
  }
};

const targetObject = { existingProp: 42 };
const proxiedObject = new Proxy(targetObject, handler);

print(proxiedObject.existingProp);  
print(proxiedObject.nonExistingProp);  
proxiedObject.newProp = 100;  
print(proxiedObject.newProp);  

 
function* generatorFunction() {
  yield 'First yield';
  yield* ['Second yield from iterable', 'Third yield'];
  yield 'Fourth yield';
}

const generator = generatorFunction();
for (const value of generator) {
  print(value);
}
