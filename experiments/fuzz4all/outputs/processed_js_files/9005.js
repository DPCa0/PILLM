(async () => {
   

   
  const delayImport = (ms, module) => new Promise(resolve => setTimeout(() => resolve(module), ms));

   
  const logAccess = (target) => new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessed property: ${prop}`);
      return obj[prop];
    }
  });

   
  const utils = await delayImport(2000, logAccess({
    greet: (name) => `Hello, ${name}!`,
    farewell: (name) => `Goodbye, ${name}!`
  }));

   
  print(utils.greet('world'));
  print(utils.farewell('world'));

   
  function* numberSequence() {
    let num = 1;
    while (true) {
      yield num++;
    }
  }

   
  const sequence = numberSequence();
  print(sequence.next().value);  
  print(sequence.next().value);  
  print(sequence.next().value);  

   
  const name = 'Alice';
  print(`Length of the name "${name}" is ${name.length}`);
})();
