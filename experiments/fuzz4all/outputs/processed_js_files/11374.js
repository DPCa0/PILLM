 

 
async function* asyncNumberGenerator(limit) {
  for (let i = 0; i < limit; i++) {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return Reflect.get(target, property);
    } else {
      print(`Property ${property} doesn't exist, defaulting to 'unknown'`);
      return 'unknown';
    }
  }
};

// Wrap an object in a Proxy to demonstrate dynamic behavior
const proxyObject = new Proxy({ name: 'Advanced JavaScript' }, handler);

// Self-executing async function to run the generator and utilize proxy
(async () => {
  const numGen = asyncNumberGenerator(5);
  
  print('Starting async iteration:');
  for await (const num of numGen) {
    print(`Generated number: ${num}`);
  }

  print('Accessing properties of a proxied object:');
  print(`Name: ${proxyObject.name}`);
  print(`Version: ${proxyObject.version}`);  
})();
