 

const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ status: 200, data: { user: { name: "Alice", age: 30 } } });
  }, 1000);
});

const validate = (response) => {
  const { status, data } = response;
  if (status !== 200) throw new Error('Invalid Response');
  return data;
};

const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return target[property];
    }
    console.error(`Property ${property} not found`);
    return undefined;
  }
};

const main = async () => {
  try {
    const response = await fetchData();
    const data = validate(response);
    const userProxy = new Proxy(data.user, handler);
    
    print(`Name: ${userProxy.name}`);  
    print(`Age: ${userProxy.age}`);    
    print(`Email: ${userProxy.email}`);  
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

main();
