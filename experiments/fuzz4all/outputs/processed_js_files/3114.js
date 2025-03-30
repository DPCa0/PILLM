 

 
(async function() {
   
  const myModule = {
    data: "Important data",
    calculate: function(a, b) {
      return a + b;
    }
  };

   
  const handler = {
    get(target, prop, receiver) {
      print(`Getting property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      print(`Setting property: ${prop} to ${value}`);
      return Reflect.set(target, prop, value, receiver);
    }
  };

   
  const proxiedModule = new Proxy(myModule, handler);

   
  print(proxiedModule.data);  
  proxiedModule.data = "New important data";  

  const sum = proxiedModule.calculate(5, 7);  
  print(`Sum: ${sum}`);

   
  function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
  }

  const [one, two, three] = numberGenerator();
  print(`Generated numbers: ${one}, ${two}, ${three}`);
})();
