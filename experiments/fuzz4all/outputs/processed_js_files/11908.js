 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        age: 30,
        email: "johndoe@example.com",
      });
    }, 1000);
  });
};

 
const logHandler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessed property "${property}": ${target[property]}`);
      return target[property];
    }
    print(`Property "${property}" not found.`);
    return undefined;
  },
};

 
async function processData() {
  try {
    const data = await fetchData();
    
     
    const proxyData = new Proxy(data, logHandler);

     
    const { name, ...rest } = proxyData;
    
    print(`Name: ${name}`);
    print(`Rest of Data: ${JSON.stringify(rest)}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
(async () => {
  await processData();
})();
