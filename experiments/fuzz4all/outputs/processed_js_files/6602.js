 

 
function* createDataStream() {
  for (let i = 0; i < 5; i++) {
    yield new Promise((resolve) => setTimeout(() => resolve(i), 1000));
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessing property: ${prop}`);
    return Reflect.get(...arguments);
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

 
async function processDataStream(generator) {
  const dataStream = generator();
  let result = await dataStream.next();

   
  const dataObj = new Proxy({}, handler);
  dataObj.values = [];

  while (!result.done) {
    const value = await result.value;
    dataObj.values.push(value * 2);  
    result = await dataStream.next();
  }

  print('Final data:', dataObj.values);
}

 
processDataStream(createDataStream);
