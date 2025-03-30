 
async function fetchData(url) {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

     
    let data = await response.json();
    let processedData = new Map();

     
    data.forEach(({ id, title }) => {
      processedData.set(id, title);
    });

     
    for (let [id, title] of processedData) {
      print(`ID: ${id}, Title: ${title}`);
    }
  } catch (error) {
     
    console.error(`An error occurred: ${error.message}`);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    print(`Property ${prop} set to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

let targetObject = { a: 1, b: 2 };
let proxyObject = new Proxy(targetObject, handler);

 
proxyObject.a;
proxyObject.b = 3;

 
fetchData('https://jsonplaceholder.typicode.com/todos');
