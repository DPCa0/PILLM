 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Alice', age: 30, location: 'Wonderland' });
    }, 1000);
  });
};

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Property ${prop} accessed with value: ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    } else {
      print(`Property ${prop} is not found.`);
      return undefined;
    }
  },
};

(async () => {
  try {
    const data = await fetchData();
    const { name, age } = data;  
    print(`Destructured data: Name - ${name}, Age - ${age}`);

    const proxyData = new Proxy(data, handler);

     
    print(`Name: ${proxyData.name}`);
    print(`Age: ${proxyData.age}`);
    print(`Location: ${proxyData.location}`);
    print(`Occupation: ${proxyData.occupation}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
