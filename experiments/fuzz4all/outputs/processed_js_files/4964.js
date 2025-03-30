 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: `Data from ${url}` };
      resolve(data);
    }, 1000);
  });
};

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing property "${property}"`);
      return target[property];
    } else {
      throw new Error(`Property "${property}" not found`);
    }
  },
  set(target, property, value) {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
};

 
const targetObject = { name: "JavaScript", year: 1995 };
const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
  try {
     
    const data = await fetchData("https://api.example.com/resource");
    print("Fetched data:", data);

     
    print(proxyObject.name);  
    proxyObject.year = 2021;  
    print(proxyObject.year);

  } catch (error) {
    console.error("Error:", error);
  }
})();
