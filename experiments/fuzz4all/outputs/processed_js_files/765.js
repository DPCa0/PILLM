 

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property ${prop} not found`;
    }
  }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

print(proxy.a);  
print(proxy.c);  

 
class AdvancedFeatures {
  #privateField = 'Private Value';

  constructor(name) {
    this.name = name;
  }

  getPrivateField() {
    return this.#privateField;
  }

  static staticMethod() {
    return 'This is a static method';
  }
}

const instance = new AdvancedFeatures('JavaScript');
print(instance.getPrivateField());  
print(AdvancedFeatures.staticMethod());  

 
const mapExample = new Map();
mapExample.set('key1', 'value1');
mapExample.set('key2', 'value2');

const setExample = new Set([1, 2, 3, 4, 5]);

 
const { key1, key2 } = Object.fromEntries(mapExample);
const [first, ...rest] = setExample;

print(key1, key2);  
print(first, rest);  

 
 
