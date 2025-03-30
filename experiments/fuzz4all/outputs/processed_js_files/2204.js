 
const manipulateArray = ([first, ...rest], multiplier = 2) => ({
  doubledFirst: first * multiplier,
  restSquared: rest.map(num => num ** 2),
  originalArray: [first, ...rest],
});

 
const handler = {
  get: (obj, prop) => {
    print(`Accessing property "${prop}"`);
    return obj[prop];
  },
};

 
const delayedComputation = (inputArray) => new Promise((resolve) => {
  setTimeout(() => {
    const result = manipulateArray(inputArray);
    resolve(new Proxy(result, handler));
  }, 1000);
});

 
(async () => {
  const numbers = [10, 5, 3];
  const result = await delayedComputation(numbers);
  
   
  print(result.doubledFirst);
  print(result.restSquared);
  print(result.originalArray);
})();
