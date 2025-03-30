 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ id: 1, name: "John Doe", age: 30 });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
};

 
const handler = {
  get(target, prop) {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

(async () => {
  try {
     
    const userData = await fetchData("https://api.example.com/data");

     
    const { id, name, age } = userData;
    
     
    const user = new Proxy({ id, name, age }, handler);

     
    print(`User ID: ${user.id}`);
    print(`User Name: ${user.name}`);
    print(`User Age: ${user.age}`);
    
     
    user.name = "Jane Doe";
    
    print(`Updated User Name: ${user.name}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
})();
