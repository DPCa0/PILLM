 

 
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { user: { name: 'Alice', age: 25 } } });
    }, 1000);
  });

 
const loggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessed property "${prop}" with value:`, obj[prop]);
      return Reflect.get(obj, prop);
    },
  });
};

 
const processData = async () => {
  try {
     
    const result = await fetchData();
    
     
    const {
      data: { user },
    } = result;

     
    const proxiedUser = loggingProxy(user);

     
    print(`User Name: ${proxiedUser.name}`);
    print(`User Age: ${proxiedUser.age}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
processData();
