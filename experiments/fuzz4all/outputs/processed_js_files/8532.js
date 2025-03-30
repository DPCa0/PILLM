 

 
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting ${property}: ${target[property]}`);
      return target[property];
    } else {
      print(`Property ${property} does not exist.`);
    }
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const user = {
  name: "Alice",
  age: 30
};

const userProxy = new Proxy(user, handler);

 
userProxy.name;          
userProxy.age = 31;      

 
(async () => {
  try {
    const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(dataUrl);  
    
     
    const dataGen = dataGenerator(data);
    for (let i = 0; i < 5; i++) {
      print(dataGen.next().value);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
