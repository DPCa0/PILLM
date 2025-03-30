 

 
const asyncOperation = (value, delay) => 
  new Promise(resolve => setTimeout(() => resolve(value * value), delay));

 
function* generateAsyncTasks(dataArray) {
  for (let data of dataArray) {
    yield asyncOperation(data, 1000);
  }
}

 
async function processTasks(tasks) {
  let results = [];
  for (let task of tasks) {
    const result = await task;  
    results.push(result);
  }
  return results;
}

 
const inputData = [1, 2, 3, 4, 5];
const [first, ...rest] = inputData;

 
print('First Element:', first);

 
const taskGenerator = generateAsyncTasks(rest);
processTasks(taskGenerator).then(results => {
  print('Processed Results:', results);
});

 
const dataObject = { a: 1, b: 2, c: 3 };
const transformed = Object.entries(dataObject).map(([key, value]) => ({
  [key.toUpperCase()]: value * 2
}));

print('Transformed Data:', transformed);
