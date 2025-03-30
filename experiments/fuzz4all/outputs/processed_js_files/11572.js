 

 
const asyncOperation = async (value, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed: ${value}`);
    }, delay);
  });
};

 
async function processValues(values) {
  const results = [];
  for (const value of values) {
     
    const result = await asyncOperation(value, 1000);
    results.push(result);
  }
  return results;
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Property '${prop}' was accessed.`);
    return Reflect.get(target, prop, receiver);
  },
};

const targetObject = {
  a: 1,
  b: 2,
  c: 3,
};

const proxy = new Proxy(targetObject, handler);

 
async function main() {
  const valuesToProcess = ['value1', 'value2', 'value3'];

   
  const processedValues = await processValues(valuesToProcess);
  print('Processed Values:', processedValues);

   
  print('Accessing a:', proxy.a);
  print('Accessing b:', proxy.b);
  print('Accessing c:', proxy.c);
}

main();
