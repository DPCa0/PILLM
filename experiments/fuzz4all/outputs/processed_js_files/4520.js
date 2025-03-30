 

 
function* numberGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    yield i;
  }
}

 
async function fetchData(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data for ${value}`);
    }, 1000);
  });
}

 
const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Accessing property: ${prop}`);
      return obj[prop];
    } else {
      return `No such property: ${prop}`;
    }
  }
};

 
const uniqueProperty = Symbol('uniqueProperty');

 
const dataProxy = new Proxy({
  name: 'Sample Data',
  type: 'Example',
  [uniqueProperty]: 'Unique Info'
}, handler);

 
async function main() {
  const generator = numberGenerator(5);

  for (let num of generator) {
    const data = await fetchData(num);
    print(data);
  }

  print(dataProxy.name);  
  print(dataProxy.nonExistentProp);  

  print(dataProxy[uniqueProperty]);  
}

 
main();
