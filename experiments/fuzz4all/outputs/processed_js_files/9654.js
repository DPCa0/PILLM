 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchData = async () => {
  try {
    const data = await delay(Math.random() * 1000);
    print("Fetched data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
const handler = {
  get: (obj, prop) => {
    print(`Accessed property: ${prop}`);
    return obj[prop];
  }
};

const data = { id: 1, value: "Hello, Proxy!" };
const proxyData = new Proxy(data, handler);

 
const { id, value, ...rest } = proxyData;
print(id, value, rest);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
(() => {
  const privateVar = "This is private";
  print(privateVar);
})();

 
const user = { name: "Alice", preferences: null };
print(user.preferences?.theme ?? "Default Theme");

 
class MyClass {
  #privateField = 42;

  #privateMethod() {
    print("This is a private method");
  }

  publicMethod() {
    print(this.#privateField);
    this.#privateMethod();
  }
}

const myInstance = new MyClass();
myInstance.publicMethod();

 
fetchData();
