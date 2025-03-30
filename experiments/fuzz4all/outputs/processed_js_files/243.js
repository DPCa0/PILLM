 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return response.json();
}

 
function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  while (limit--) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const defaultDictHandler = {
  get: (target, name) => (name in target ? target[name] : 42)
};
const defaultDict = new Proxy({}, defaultDictHandler);

 
const promiseExample = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Data processed after 1 second'), 1000);
});

 
(async () => {
  print("Hello, advanced JavaScript!");

  try {
    const data = await fetchData('https://api.github.com/users/octocat');
    print(`Fetched Data: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error('Fetching failed:', error);
  }

  print("Fibonacci sequence:");
  const fib = fibonacciGenerator(5);
  for (const num of fib) {
    print(num);
  }

  print("Proxy with default value:");
  print(`Existing Key: ${defaultDict['key']}`);
  print(`Missing Key: ${defaultDict['missingKey']}`);
  
  promiseExample.then(message => print(message));
})();
