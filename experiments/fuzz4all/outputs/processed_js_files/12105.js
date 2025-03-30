 

const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId: 1, name: 'John Doe', age: 25 });
    }, 1000);
  });
};

const processData = async () => {
  try {
    const { name, age } = await fetchData();
    
    const handler = {
      get: (obj, prop) => {
        if (prop === 'greet') {
          return `Hello, ${obj.name}!`;
        }
        return obj[prop];
      }
    };

    const userProxy = new Proxy({ name, age }, handler);

    print(userProxy.greet);
    print(`Age: ${userProxy.age}`);
  } catch (error) {
    console.error("Error processing data:", error);
  }
};

processData();
