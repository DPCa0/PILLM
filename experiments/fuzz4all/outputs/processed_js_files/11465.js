 

 
const fetchData = (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      data ? resolve(`Data: ${data}`) : reject('No data found');
    }, 1000);
  });

 
async function getData(item) {
  try {
    const result = await fetchData(item);
    print(result);
  } catch (error) {
    console.error(error);
  }
}

 
const handler = {
  get: function (target, property) {
    print(`Property '${property}' was accessed.`);
    return property in target ? target[property] : 42;
  },
};

 
const myObject = new Proxy({ a: 1, b: 2 }, handler);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const gen = idGenerator();

 
getData("Hello, world!");     
print(myObject.a);      
print(myObject.nonExistentProperty);  
print(gen.next().value);  
print(gen.next().value);  
