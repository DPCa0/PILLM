 

 
const fetchData = () => new Promise((resolve) =>
  setTimeout(() => resolve({ data: { user: { name: 'Alice', age: 30 } } }), 1000)
);

 
const handler = {
  get: (target, property) => {
    return property in target ? target[property] : `Property ${property} not found`;
  }
};

 
(async () => {
  try {
    const response = await fetchData();
    const {
      data: {
        user: { name, age }
      }
    } = response;

     
    const userProxy = new Proxy({ name, age }, handler);

    print(`User: ${userProxy.name}, Age: ${userProxy.age}`);
    print(`Attempting to access a non-existent property: ${userProxy.email}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
