 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(...arguments);
  }
};

const targetObject = {
  a: 1,
  b: 2,
  c: 3
};

const proxiedObject = new Proxy(targetObject, handler);

 
async function asyncGeneratorExample() {
  const gen = numberGenerator();
  
  print('Start processing...');
  for (let i = 0; i < 3; i++) {
    print(`Generated number: ${gen.next().value}`);
    await delay(1000);
  }
  
  print(proxiedObject.a);  
  print(proxiedObject.b);  
  
  print('Processing complete!');
}

 
asyncGeneratorExample();
