 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
(async () => {
  const greet = async (name) => {
    await delay(1000);  
    print(`Hello, ${name}!`);
  };

   
  const person = new Proxy({ name: 'world' }, {
    get: (target, property) => {
      print(`Accessing property: ${property}`);
      return target[property];
    },
    set: (target, property, value) => {
      print(`Setting property: ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  });

  await greet(person.name);  

   
  function* taskGenerator() {
    yield greet('Alice');
    yield greet('Bob');
    yield greet('Charlie');
  }

   
  for (const task of taskGenerator()) {
    await task;
  }
})();
