 

 
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'Alice', age: 30 });
  }, 1000);
});

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Property '${property}' accessed.`);
      return target[property];
    } else {
      print(`Property '${property}' does not exist.`);
      return undefined;
    }
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to '${value}'.`);
    target[property] = value;
    return true;
  }
};

 
const createProxy = (obj) => new Proxy(obj, handler);

 
(async function main() {
  try {
    print('Fetching data...');
    const data = await fetchData();

    const proxiedData = createProxy(data);
    
     
    print(`Name: ${proxiedData.name}`);
    print(`Age: ${proxiedData.age}`);
    
     
    proxiedData.location = 'Wonderland';
    print(`Location: ${proxiedData.location}`);

     
    print(`Occupation: ${proxiedData.occupation}`);

     
    const dynamicObj = Reflect.construct(Object, []);
    Reflect.set(dynamicObj, 'title', 'Engineer');
    print(`Dynamic object title: ${Reflect.get(dynamicObj, 'title')}`);

  } catch (error) {
    console.error('Error:', error);
  }
})();
