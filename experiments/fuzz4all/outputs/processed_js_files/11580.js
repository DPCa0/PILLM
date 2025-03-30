 

 
function delayedResult(value, delay) {
  return new Promise(resolve => setTimeout(() => resolve(value), delay));
}

 
async function complexOperation() {
   
  const resultsMap = new Map();

   
  const [result1, result2, result3] = await Promise.all([
    delayedResult('Result A', 1000),
    delayedResult('Result B', 2000),
    delayedResult('Result C', 1500)
  ]);

   
  resultsMap.set('operation1', result1);
  resultsMap.set('operation2', result2);
  resultsMap.set('operation3', result3);

   
  const resultsSet = new Set(resultsMap.values());

   
  const resultsProxy = new Proxy(resultsMap, {
    get(target, property, receiver) {
      if (target.has(property)) {
        print(`Accessing result: ${property}`);
        return Reflect.get(target, property, receiver);
      } else {
        console.warn(`Attempt to access nonexistent property: ${property}`);
        return undefined;
      }
    }
  });

   
  print(resultsProxy.get('operation1'));  
  print(resultsProxy.get('operation4'));  

   
  print(Array.from(resultsSet));  
}

 
complexOperation().catch(console.error);
