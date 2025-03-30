 

function* fetchDataGenerator() {
  yield 'Fetching Data...';
  yield new Promise(resolve => setTimeout(() => resolve('Data Fetched!'), 1000));
}

async function processData() {
  const dataGen = fetchDataGenerator();
  print(dataGen.next().value);  
  
  const result = await dataGen.next().value;  
  return `Processing: ${result}`;
}

const handler = {
  get: async function(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(...arguments);
    } else {
      print(`Fetching and processing ${prop}`);
      const data = await processData();
      target[prop] = data;
      return data;
    }
  }
};

const dataProxy = new Proxy({}, handler);

async function main() {
  print(await dataProxy.newData);   
  print(await dataProxy.newData);   
}

main();
