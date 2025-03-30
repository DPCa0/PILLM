 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* generateNumbers() {
  let i = 0;
  while (true) yield i++;
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property '${prop}': ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property '${prop}' not found`);
      return undefined;
    }
  },
  set(target, prop, value, receiver) {
    print(`Setting property '${prop}' to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
async function runAsyncSequence() {
  const numGen = generateNumbers();
  
  for (let i = 0; i < 3; i++) {
    const { value } = numGen.next();
    print(`Generated number: ${value}`);
    await delay(1000);  
  }

  const data = await fetchData();
  print('Fetched Data:', data);
}

 
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Test Data' });
    }, 1500);
  });
}

 
const targetObject = { foo: 'bar', hello: 'world' };
const proxy = new Proxy(targetObject, handler);

 
proxy.foo;           
proxy.hello = 'JS';  
proxy.nonExistent;   

 
runAsyncSequence();
