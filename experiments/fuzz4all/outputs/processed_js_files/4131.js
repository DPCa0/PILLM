 

 
const observable = obj => new Proxy(obj, {
  set(target, prop, value) {
    print(`Property ${prop} set to ${value}`);
    target[prop] = value;
    return true;
  }
});

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "John", age: 30, location: "Earth" });
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const data = await fetchData();
    const { name, ...details } = data;
    print(`Name: ${name}`);
    const userDetails = { ...details, occupation: "Developer" };
    
    const user = observable(userDetails);
    user.age = 31;  
    print(`User Details:`, user);
  } catch (error) {
    console.error("Error processing user data:", error);
  }
};

 
processUserData();
