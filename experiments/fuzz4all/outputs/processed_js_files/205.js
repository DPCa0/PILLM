 
 

 
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.1
        ? resolve("Data fetched successfully!")
        : reject("Fetch error occurred!");
    }, 1000);
  });

 
async function asyncFetch() {
  try {
    const data = await fetchData();
    print(data);
  } catch (error) {
    console.error(error);
  }
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const gen = idGenerator();

 
const targetObject = { value: 42 };

const handler = {
  get: (obj, prop) => {
    print(`Getting ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, val) => {
    print(`Setting ${prop} to ${val}`);
    obj[prop] = val;
    return true;
  },
};

const proxy = new Proxy(targetObject, handler);

 
print(proxy.value);  
proxy.value = 24;          
print(proxy.value);  

 
(async function main() {
  print("Async fetch example:");
  await asyncFetch();

  print("\nID Generator example:");
  print("Generated ID:", gen.next().value);
  print("Generated ID:", gen.next().value);

  print("\nProxy interaction example:");
  print(`Final value in proxy object: ${proxy.value}`);
})();
