 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const loggerProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Property "${prop}" accessed`);
      return Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
      print(`Property "${prop}" set to "${value}"`);
      return Reflect.set(obj, prop, value);
    }
  });
};

 
class ComplexObject {
  #privateField = 'privateData';
  
  constructor(data) {
    this.data = loggerProxy(data);
  }

  #privateMethod() {
    return `This is a ${this.#privateField}`;
  }

  publicMethod() {
    return this.#privateMethod();
  }
}

 
const url = 'https://jsonplaceholder.typicode.com/todos/1';

 
(async () => {
  const data = await fetchData(url);
  if (data) {
    const complexObj = new ComplexObject(data);
    print(complexObj.publicMethod());  
    print(complexObj.data.title);      
  }
})();
