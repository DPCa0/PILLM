 
const complexOperation = (a, b, ...rest) => {
  const [first, second] = rest;
  
   
  const uniqueNumbers = new Set([a, b, ...rest]);
  const numberMap = new Map();
  
  uniqueNumbers.forEach((num, index) => {
    numberMap.set(`number${index}`, num);
  });

   
  const asyncCalculation = async (num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = num * num;
        result > 1000 ? reject('Result too large') : resolve(result);
      }, 100);
    });
  };

   
  (async () => {
    try {
      for (let key of numberMap.keys()) {
        const num = numberMap.get(key);
        const result = await asyncCalculation(num);
        print(`Square of ${num}: ${result}`);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  })();

   
  const taggedTemplate = (strings, ...values) => {
    return strings.reduce((prev, curr, i) => `${prev}${curr}${values[i] ? `[${values[i]}]` : ''}`, '');
  };

  const message = taggedTemplate`Calculating squares for ${a} and ${b} with extra numbers ${first} and ${second}.`;
  print(message);
};

 
complexOperation(10, 20, 30, 40, 50);
