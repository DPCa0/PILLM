 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncCounter(max) {
  for (let i = 0; i <= max; i++) {
    await delay(500);   
    yield i;
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return Reflect.get(...arguments);
    }
    console.warn(`Property "${prop}" not found!`);
    return undefined;
  }
};

 
const user = new Proxy({ name: "Alice", age: 30 }, handler);

 
(async () => {
  print('Starting async generator...');
  for await (let num of asyncCounter(3)) {
    print(num);
  }
  print('Async generator complete!');

   
  print(`User Name: ${user.name}`);
  print(`User Age: ${user.age}`);
  print(`User Email: ${user.email}`);   
})();
