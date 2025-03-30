 

 
const reactiveHandler = {
  get(target, property) {
    print(`Getting property "${property}"`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  },
};

const reactiveObject = new Proxy({ a: 1, b: 2 }, reactiveHandler);

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
const processData = (data) => {
  const [first, ...rest] = data;
  const doubled = rest.map((num) => num * 2);
  return { first, doubled };
};

 
const uniqueKey = Symbol('uniqueKey');
const uniqueDataSet = new Set();

const addUniqueData = (data) => {
  if (!uniqueDataSet.has(data[uniqueKey])) {
    uniqueDataSet.add(data[uniqueKey]);
    print('Added unique data:', data);
  } else {
    print('Data already exists:', data);
  }
};

 
reactiveObject.a = 10;
print(reactiveObject.a);

 
fetchData('https://jsonplaceholder.typicode.com/posts/1')
  .then((data) => console.log('Fetched data:', data))
  .catch((error) => console.error('Error:', error));

 
const numbers = numberGenerator();
print(numbers.next().value);  
print(numbers.next().value);  
print(numbers.next().value);  

 
const numbersArray = [10, 20, 30, 40, 50];
const processedData