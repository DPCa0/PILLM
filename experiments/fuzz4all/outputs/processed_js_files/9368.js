 

 
const fetchData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { name: "John Doe", age: 30, email: "john.doe@example.com" } });
    }, 1000);
  });

 
async function processData() {
  try {
    const { data } = await fetchData();
    const { name, ...rest } = data;

     
    print(`Fetched User: ${name}`);
    return { ...rest, name };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
const dataHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    return `Property "${prop}" not found`;
  },
  set(target, prop, value) {
    if (typeof value === "string") {
      target[prop] = value.toUpperCase();
    } else {
      target[prop] = value;
    }
    return true;
  },
};

(async () => {
  const userData = await processData();

   
  const userProxy = new Proxy(userData, dataHandler);

  print(`Name (Proxy): ${userProxy.name}`);  
  print(`Age (Proxy): ${userProxy.age}`);
  print(`Phone (Proxy): ${userProxy.phone}`);  

  userProxy.name = "Jane Smith";  
  print(`Updated Name (Proxy): ${userProxy.name}`);
})();
