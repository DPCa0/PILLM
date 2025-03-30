 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* valueGenerator() {
  yield 'Value 1';
  yield 'Value 2';
  yield 'Value 3';
}

 
async function processValues(generator) {
  const values = [];

  for (const value of generator) {
    await delay(1000);  
    values.push(value.toUpperCase());
  }

  return values;
}

 
(async function() {
  const results = await processValues(valueGenerator());

  const handler = {
    get(target, property) {
      if (property in target) {
        print(`Accessing property '${property}':`, target[property]);
        return target[property];
      }
      console.error(`Property '${property}' does not exist.`);
      return undefined;
    }
  };

  const proxiedResults = new Proxy(results, handler);

   
  const [first, second, third] = proxiedResults;
  print(first);
  print(second);
  print(third);
})();
