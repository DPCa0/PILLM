 

 
function* fetchDataGenerator() {
  yield 'Fetching data...';
  yield new Promise((resolve) => setTimeout(() => resolve('Data received'), 1000));
  yield 'Processing data...';
  return 'Data processing complete';
}

 
async function handleData() {
  const generator = fetchDataGenerator();
  let result = generator.next();

  while (!result.done) {
    if (result.value instanceof Promise) {
      print(await result.value);
    } else {
      print(result.value);
    }
    result = generator.next();
  }

  print(result.value);  
}

 
const functionHandler = {
  apply: (target, thisArg, argumentsList) => {
    print(`Function ${target.name} called with arguments: ${argumentsList.join(', ')}`);
    return Reflect.apply(target, thisArg, argumentsList);
  },
};

 
function simpleFunction(...args) {
  return `Hello, ${args.join(' ')}`;
}

 
const proxiedFunction = new Proxy(simpleFunction, functionHandler);

 
(async function main() {
   
  print(proxiedFunction('advanced', 'JavaScript', 'developer'));

   
  await handleData();
})();
