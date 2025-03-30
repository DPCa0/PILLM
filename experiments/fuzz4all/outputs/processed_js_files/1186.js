 
const asyncModule = (() => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  };

  const processAsyncData = async (url) => {
    try {
      const data = await fetchData(url);
      print('Data fetched:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return {
    processAsyncData
  };
})();

 
const personHandler = {
  get: (obj, prop) => {
    return prop in obj ? obj[prop] : `Property "${prop}" is not defined`;
  },
  set: (obj, prop, value) => {
    if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
      throw new TypeError('Age must be a positive number');
    }
    obj[prop] = value;
  }
};

const person = new Proxy({}, personHandler);

 
Reflect.set(person, 'name', 'Alice');
Reflect.set(person, 'age', 30);

print(Reflect.get(person, 'name'));  
print(Reflect.get(person, 'age'));  
print(Reflect.get(person, 'occupation'));  

 
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? `<b>${values[i]}</b>` : '';
    return result + str + value;
  }, '');
}

const language = 'JavaScript';
const feature = 'Tagged Templates';
print(highlight`Learning ${feature} in ${language} is fun!`);

 
asyncModule.processAsyncData('https://jsonplaceholder.typicode.com/todos/1');
