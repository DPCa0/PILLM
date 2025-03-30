 
function* numberGenerator() {
  for (let i = 1; i <= 5; i++) {
    yield i;
  }
}

 
async function asyncOperation(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed number: ${num}`);
    }, 1000);
  });
}

 
async function processNumbers() {
  const results = [];
  for await (let num of numberGenerator()) {
    let result = await asyncOperation(num);
    results.push(result);
  }
  return results;
}

 
const handler = {
  get(target, prop) {
    if (prop === 'length') {
      return target.filter((item) => item !== undefined).length;
    }
    return Reflect.get(target, prop);
  },
};

 
(async () => {
   
  let numbers = [1, , 3, , 5];
  
   
  const proxiedNumbers = new Proxy(numbers, handler);
  
   
  print(`Filtered length: ${proxiedNumbers.length}`);

   
  const results = await processNumbers();
  results.forEach((res) => print(res));

   
  const dataMap = new Map();
  dataMap.set('numbers', proxiedNumbers);
  dataMap.set('results', results);

   
  const { results: [firstResult, ...otherResults] } = Object.fromEntries(dataMap);

   
  print(`First Result: ${firstResult}`);
  print(`Other Results: ${otherResults.join(', ')}`);
})();
