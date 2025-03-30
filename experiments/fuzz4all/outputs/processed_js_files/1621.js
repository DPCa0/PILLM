 
const logger = {
  get: function(target, property) {
    if (property in target) {
      print(`Property '${property}' accessed: ${target[property]}`);
      return target[property];
    } else {
      console.error(`Property '${property}' does not exist on target.`);
      return undefined;
    }
  }
};

 
const data = {
  name: "John Doe",
  age: 30,
  greet: function() {
    return `Hello, my name is ${this.name}.`;
  }
};

 
const proxyData = new Proxy(data, logger);

 
const introduce = ({ name, age }) => `My name is ${name} and I am ${age} years old.`;

print(proxyData.name);  
print(introduce(proxyData));  
print(proxyData.greet());  

 
const fetchData = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Fetched Data");
    }, 2000);
  });

  try {
    const result = await promise;
    print(result);
  } catch (error) {
    console.error(error);
  }
};

fetchData();  

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();

print(ids.next().value);  
print(ids.next().value);  
print(ids.next().value);  
