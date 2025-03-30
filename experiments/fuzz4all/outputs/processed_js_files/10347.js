 

 
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property "${prop}"`);
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist!`);
      return undefined;
    }
  }
};

 
const data = {
  name: 'ComplexObject',
  description: 'A demonstration of advanced JS features'
};

 
const proxyData = new Proxy(data, handler);

 
async function runAdvancedExample() {
  print('Starting the advanced JavaScript example...');

   
  print(proxyData.name);  
  print(proxyData.nonExistentProperty);  

   
  const gen = numberGenerator();
  for (let i = 0; i < 5; i++) {
    const numPromise = gen.next().value;
    const number = await numPromise;
    print(`Generated number: ${number}`);
  }
}

 
runAdvancedExample();
