 
const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: 'Alice', age: 25 };
      Math.random() > 0.2 ? resolve(data) : reject('Failed to fetch data');
    }, 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      throw new ReferenceError(`Property "${prop}" does not exist.`);
    }
  },
  set: (target, prop, value) => {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[prop] = value;
    return true;
  }
};

 
(async () => {
  try {
    const rawData = await fetchData();
    const userProxy = new Proxy(rawData, handler);

    print(`User: ${userProxy.user}, Age: ${userProxy.age}`);  

    userProxy.age = 30;  
    print(`Updated Age: ${userProxy.age}`);

     
    const { user, age } = userProxy;
    print(`Destructured User: ${user}, Age: ${age}`);

  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();
