 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
};

 
function* fibonacciSequence(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const targetObject = { name: 'AdvancedJS', version: 1.0 };
const handler = {
  get: (target, property) => {
    print(`Getting property ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};
const proxiedObject = new Proxy(targetObject, handler);

 
(async () => {
  print('Starting the advanced JavaScript program...');

   
  print(proxiedObject.name);
  proxiedObject.version = 2.0;
  print(proxiedObject.version);

   
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  try {
    const data = await fetchData(url);
    print('Fetched Data:', data);
  } catch (error) {
    print('Fetching failed.');
  }

   
  print('Fibonacci Sequence up to 50:');
  for (let num of fibonacciSequence(50)) {
    print(num);
  }
})();
