 

 
const randomDelay = (min, max) => new Promise(resolve => {
  const delay = Math.floor(Math.random() * (max - min + 1) + min);
  setTimeout(() => resolve(`Resolved after ${delay} ms`), delay);
});

 
async function executeSequentially(promises) {
  const results = [];
  for (const promise of promises) {
    const result = await promise();
    results.push(result);
    print(result);
  }
  return results;
}

 
const arrayHandler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing element ${property}: ${target[property]}`);
      return target[property];
    } else {
      print(`Property ${property} not found`);
      return undefined;
    }
  }
};

 
(async () => {
  const delays = [() => randomDelay(100, 500), () => randomDelay(200, 600), () => randomDelay(300, 700)];
  const results = await executeSequentially(delays);

  const proxiedResults = new Proxy(results, arrayHandler);

   
  print(proxiedResults[0]);
  print(proxiedResults[1]);
  print(proxiedResults[3]);  
})();
