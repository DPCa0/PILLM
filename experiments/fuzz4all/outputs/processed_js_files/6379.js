 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    print('Data fetched:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const person = { name: 'Alice', age: 25 };
const handler = {
  get(target, prop) {
    print(`Property ${prop} was accessed`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Property ${prop} was set to ${value}`);
    return Reflect.set(target, prop, value);
  }
};
const proxiedPerson = new Proxy(person, handler);

 
function styledTemplate(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ? `<strong>${values[i]}</strong>` : ''), '');
}
const styledMessage = styledTemplate`Hello, ${proxiedPerson.name}. You are ${proxiedPerson.age} years old.`;

 
(async function main() {
  print(styledMessage);  
  proxiedPerson.age = 26;      
  print(proxiedPerson.age);
  
  await delay(2000);           
  fetchData('https://jsonplaceholder.typicode.com/todos/1');
})();
