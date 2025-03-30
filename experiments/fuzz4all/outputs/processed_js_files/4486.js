 

 
const asyncOperation = (message, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(message), delay);
  });
};

 
async function* asyncGenerator() {
  yield await asyncOperation('First Result', 1000);
  yield await asyncOperation('Second Result', 1500);
  yield await asyncOperation('Third Result', 500);
}

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' has been accessed.`);
    return target[prop];
  },
};

 
const targetObject = {
  message: 'Hello, Proxy!',
  value: 42
};

 
const proxyObject = new Proxy(targetObject, handler);

 
const main = async () => {
  print(proxyObject.message);  

  const generator = asyncGenerator();
  
  for await (const data of generator) {
    print(data);
  }
  
   
  const results = await Promise.all([
    asyncOperation('Parallel Result 1', 800),
    asyncOperation('Parallel Result 2', 1200)
  ]);

  print(results);
};

 
main().catch(console.error);
