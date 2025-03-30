 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      url ? resolve({ data: { user: { id: 1, name: "Alice" } } }) : reject("URL not provided");
    }, 1000);
  });
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessing ${prop}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

 
const main = async () => {
  try {
    const url = "https://api.example.com/user";
    const { data: { user: { name } } } = await fetchData(url);  
    const user = createLoggingProxy({ id: 1, name });  

    user.name = "Bob";  

    const greet = ({ name }) => `Hello, ${name}!`;  
    print(greet(user));  
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

main();
