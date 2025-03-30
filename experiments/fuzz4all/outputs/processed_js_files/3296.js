 
const makeMultiplier = (factor) => {
  return (number) => number * factor;
};

 
const fetchData = async () => {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    let data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const loggingHandler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

const person = new Proxy({ name: 'John Doe', age: 30 }, loggingHandler);

 
const uniqueKey = Symbol('unique');
person[uniqueKey] = 'This is a unique property';

print(person.name);   
print(person.age);    
print(person[uniqueKey]);

 
function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  while (limit-- > 0) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

const fibonacci = fibonacciGenerator(5);
for (const value of fibonacci) {
  print(value);  
}

 
const personDetails = { ...person, gender: 'Male' };
const array = [1, 2, 3];
const extendedArray = [...array, 4, 5, 6];

print(personDetails);
print(extendedArray);

 
fetchData();
