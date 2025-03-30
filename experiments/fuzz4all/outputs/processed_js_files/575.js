 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

 
const validator = {
  set(target, key, value) {
    if (key === 'age' && (typeof value !== 'number' || value <= 0)) {
      throw new Error('Age must be a positive number');
    }
    target[key] = value;
    return true;
  }
};

const person = new Proxy({}, validator);

try {
  person.age = 25;  
  person.name = 'Alice';  
  person.age = -5;  
} catch (error) {
  console.error(error.message);
}

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

const numbers = numberGenerator();

print(numbers.next().value);  
print(numbers.next().value);  

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

const set = new Set([1, 2, 3, 4, 4]);  

print(map.get('key1'));  
print(set.has(3));  

 
const user = { firstName: 'John', lastName: 'Doe' };
const { firstName, lastName } = user;
print(`Hello, ${firstName} ${lastName}`);  

 
(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
