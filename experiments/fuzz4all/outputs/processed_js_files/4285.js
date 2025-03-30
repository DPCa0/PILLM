const asyncDouble = async (num) => {
  return new Promise((resolve) => setTimeout(() => resolve(num * 2), 1000));
};

const runComplexProcess = async () => {
  const numbers = [1, 2, 3, 4, 5];
  
   
  const doubledNumbers = await Promise.all(numbers.map(async (num) => {
    const double = await asyncDouble(num);
    return { original: num, double };
  }));

   
  doubledNumbers.forEach(({ original, double }) => {
    print(`Original: ${original}, Doubled: ${double}`);
  });

   
  const nestedArray = [[1, 2], [3, 4], [5, [6, 7]]];
  const flattenedArray = nestedArray.reduce((acc, val) => acc.concat(...val), []);
  print(`Flattened Array: ${flattenedArray}`);
  
   
  const target = { message: "Hello" };
  const handler = {
    set: (obj, prop, value) => {
      print(`Setting ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  };
  
  const proxy = new Proxy(target, handler);
  proxy.message = "World";

   
  function* counterGenerator() {
    let count = 0;
    while (count < 3) {
      yield count++;
    }
  }
  
  const counter = counterGenerator();
  for (let count of counter) {
    print(`Counter: ${count}`);
  }
};

runComplexProcess();
