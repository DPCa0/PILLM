 
const handler = {
  get(target, property) {
    print(`Getting the value of ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const targetObject = { foo: 123, bar: 456 };
const proxy = new Proxy(targetObject, handler);

 
proxy.foo;  
proxy.bar = 789;  

 
const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    print(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
fetchData();

 
const userInfo = { name: 'Jane', age: 25 };
const displayUser = ({ name, age, city = 'Unknown' }) => {
  print(`Name: ${name}, Age: ${age}, City: ${city}`);
};
displayUser(userInfo);

 
const highlight = (strings, ...values) =>
  strings.reduce((acc, str, idx) => acc + str + (values[idx] ? `<strong>${values[idx]}</strong>` : ''), '');

const user = 'John Doe';
const message = highlight`Hello, ${user}! Welcome to our website.`;
print(message);

 
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

print(MathUtil.add(5, 7));  

 
const uniqueID = Symbol('id');
const person = {
  [uniqueID]: 12345,
  name: 'Alice'
};

print(person[uniqueID]);  
