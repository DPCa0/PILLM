 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async () => {
  print("Fetching data...");
  await delay(1000);  
  return { data: { user: { name: "John Doe", age: 30 } } };
};

const dataHandler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Accessing property '${prop}'`);
      return Reflect.get(target, prop, receiver);
    } else {
      print(`Property '${prop}' does not exist`);
      return null;
    }
  },
  set: (target, prop, value, receiver) => {
    if (prop === "age" && value < 0) {
      print("Age cannot be negative");
      return false;
    }
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const processUserData = async () => {
  try {
    const result = await fetchData();
    const user = new Proxy(result.data.user, dataHandler);

    print(`User Name: ${user.name}`);
    print(`User Age: ${user.age}`);

    user.age = 25;
    print(`Updated User Age: ${user.age}`);

    user.age = -5;  
    print(`Attempted to update User Age: ${user.age}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

processUserData();
