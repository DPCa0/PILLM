class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  
   
  get fahrenheit() {
    return this.celsius * 9/5 + 32;
  }

  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9;
  }
  
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `${this.celsius.toFixed(1)}°C`;
    }
    return this.celsius;
  }
}

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    print('Data fetched:', data);
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

 
const handler = {
  set(target, property, value) {
    print(`Property ${property} changed from ${target[property]} to ${value}`);
    target[property] = value;
    return true;
  }
};

const person = new Proxy({ name: 'Alice', age: 25 }, handler);
person.age = 26;  

 
function* generateNumbers() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

const numberGenerator = generateNumbers();
print(numberGenerator.next().value);  
print(numberGenerator.next().value);  

 
const temp = new Temperature(25);
print(`${temp}`);  
print(temp.fahrenheit);  
temp.fahrenheit = 100;
print(`${temp}`);  

 
fetchData('https://jsonplaceholder.typicode.com/todos/1');
