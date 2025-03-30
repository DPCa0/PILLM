 
 

function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

const asyncFunction = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 1000);
  });
};

const fetchData = async () => {
  try {
    const data = await asyncFunction();
    print(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
const user = {
  name: "Alice",
  age: 30,
  job: "Engineer"
};

const { name, job } = user;
print(`User Name: ${name}, Job: ${job}`);

 
const targetObject = { prop1: 42, prop2: "Hello" };
const handler = {
  get: (obj, prop) => {
    print(`Accessing property ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);

 
print(proxy.prop1);
print(proxy.prop2);

 
proxy.prop1 = 100;
proxy.prop2 = "World";

 
const gen = numberGenerator();
print(gen.next().value);  
print(gen.next().value);  
print(gen.next().value);  

 
fetchData();
