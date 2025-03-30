 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

 
const createLoggingProxy = (obj) => {
  return new Proxy(obj, {
    get(target, property, receiver) {
      print(`Accessing ${String(property)} property`);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      print(`Setting ${String(property)} to ${value}`);
      return Reflect.set(target, property, value, receiver);
    },
  });
};

 
const uniqueKey = Symbol('uniqueKey');

 
class EnhancedArray extends Array {
  constructor(...args) {
    super(...args);
    this[uniqueKey] = 'secretValue';
  }

  static fromArgs(...args) {
    return new EnhancedArray(...args);
  }

  printAll() {
    print(...this);
  }
}

 
(async () => {
   
  const sampleObject = createLoggingProxy({ x: 10, y: 20 });
  
   
  print(sampleObject.x);
  sampleObject.y = 50;

   
  const apiData = await fetchData('https://api.github.com');
  print('Fetched data:', apiData);

   
  const customArray = EnhancedArray.fromArgs(1, 2, 3, 4, 5);
  customArray.printAll();
  print('Unique key value:', customArray[uniqueKey]);

   
  const name = 'Advanced JavaScript';
  print(`This is a demonstration of ${name} features!`);
})();
