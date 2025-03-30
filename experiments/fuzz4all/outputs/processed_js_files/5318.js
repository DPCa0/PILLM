 

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: "Hello, Complex World!" };
      resolve(data);
    }, 1000);
  });
}

 
function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

 
async function processData() {
  try {
    const data = await fetchData();
    print(data.message);
    
    const gen = numberGenerator();
    for (let i = 0; i < 5; i++) {
      print(`Generated number: ${gen.next().value}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' was accessed.`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Property '${prop}' was set to '${value}'.`);
    target[prop] = value;
    return true;
  }
};

const person = { name: "Alice", age: 30 };
const proxyPerson = new Proxy(person, handler);

 
print(proxyPerson.name);  
proxyPerson.age = 31;           

 
processData();
