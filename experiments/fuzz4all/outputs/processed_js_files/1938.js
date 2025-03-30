 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { name: "Alice", age: 30 }, status: "active" });
    }, 1000);
  });
};

 
const logHandler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  }
};

 
const main = async () => {
  print("Fetching data...");
  const { user: { name, age }, status } = await fetchData();

  const userProxy = new Proxy({ name, age, status }, logHandler);

  print(`Name: ${userProxy.name}`);
  print(`Age: ${userProxy.age}`);
  print(`Status: ${userProxy.status}`);
};

main();
