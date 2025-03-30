 

 
const asyncOperation = (value, delay) => new Promise(resolve => setTimeout(() => resolve(value), delay));

 
async function* asyncGenerator(arr) {
  for (let item of arr) {
    yield await asyncOperation(item * 2, 500);  
  }
}

 
async function processArray(arr) {
  let result = [];
  for await (let doubledValue of asyncGenerator(arr)) {
    print(`Processed Value: ${doubledValue}`);
    result.push(doubledValue);
  }
  return result;
}

 
(async () => {
  const inputArray = [1, 2, 3, 4, 5];
  const processedResult = await processArray(inputArray);
  print(`Final Result: ${processedResult}`);
})();
