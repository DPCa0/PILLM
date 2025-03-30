 

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const data = new Proxy({ a: 1, b: 2 }, handler);

 
async function* asyncNumberGenerator(limit) {
  for (let i = 1; i <= limit; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

 
(async () => {
  const promises = [asyncNumberGenerator(3), asyncNumberGenerator(2)];

  const results = await Promise.allSettled(promises.map(async (generator) => {
    let numbers = [];
    for await (const num of generator) {
      numbers.push(num);
    }
    return numbers;
  }));

  const [firstResult, ...otherResults] = results.map(result => result.value);

  print('First Result:', firstResult);  
  print('Other Results:', otherResults);  

   
  data.c = 3; 
  print(data.a, data.b, data.c);
})();
