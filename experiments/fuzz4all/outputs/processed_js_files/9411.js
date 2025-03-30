 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`An error has occurred: ${response.status}`);
  const data = await response.json();
  return data;
}

 
const loggingHandler = {
  get: (target, property) => {
    print(`Property '${property}' has been accessed.`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to '${value}'.`);
    target[property] = value;
    return true;
  }
};

 
const dataObject = {
  name: 'Unknown',
  age: 0
};

 
const proxiedDataObject = new Proxy(dataObject, loggingHandler);

 
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
function processNumbers(...numbers) {
  const [first, ...rest] = numbers;
  print(`First: ${first}, Rest: ${rest}`);
  return rest.map(x => x * 2);
}

 
(async () => {
  try {
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);

     
    proxiedDataObject.name = 'John Doe';
    print('Proxied Name:', proxiedDataObject.name);

     
    const sequence = generateSequence(1, 5);
    for (let value of sequence) {
      print('Generated Value:', value);
    }

     
    const processedNumbers = processNumbers(5, 10, 15, 20);
    print('Processed Numbers:', processedNumbers);
  } catch (error) {
    console.error('Error:', error);
  }
})();
