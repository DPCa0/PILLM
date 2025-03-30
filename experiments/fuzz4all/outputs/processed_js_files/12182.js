 
const handler = {
  get: function(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function(...args) {
        print(`Called ${prop} with arguments: ${JSON.stringify(args)}`);
        return target[prop](...args);
      };
    }
    return Reflect.get(...arguments);
  }
};

 
const mathOperations = {
  add(x, y) { return x + y; },
  subtract(x, y) { return x - y; },
  multiply(x, y) { return x * y; },
  divide(x, y) { return x / y; }
};

 
const proxyMath = new Proxy(mathOperations, handler);

 
(async () => {
  const { square, cube } = await import('./mathFunctions.js');
  
   
  function logOperation(strings, operation, result) {
    print(`${strings[0]}${operation}${strings[1]}${result}`);
  }
  
  const x = 10, y = 5;
  logOperation`Adding: ${'add'} Result: ${proxyMath.add(x, y)}`;
  logOperation`Subtracting: ${'subtract'} Result: ${proxyMath.subtract(x, y)}`;
  logOperation`Multiplying: ${'multiply'} Result: ${proxyMath.multiply(x, y)}`;
  logOperation`Dividing: ${'divide'} Result: ${proxyMath.divide(x, y)}`;
  
   
  print(`Square of ${x}: ${square(x)}`);
  print(`Cube of ${y}: ${cube(y)}`);
})();

This code uses features like proxies, dynamic imports, top-level await, destructuring, and tagged template literals to demonstrate advanced JavaScript capabilities in a complex way. Note that it expects a module `mathFunctions.js` with `square` and `cube` functions to be available for import.