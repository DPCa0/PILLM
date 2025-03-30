 

function* dataGenerator() {
  yield fetchData('https://api.example.com/data1');
  yield fetchData('https://api.example.com/data2');
  yield fetchData('https://api.example.com/data3');
}

function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Fetched data from ${url}`);
    }, Math.random() * 1000);
  });
}

async function consumeGenerator(gen) {
  for (const promise of gen) {
    print(await promise);
  }
}

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Accessed property: ${prop}`);
      return obj[prop];
    }
    return `Property ${prop} does not exist`;
  },
  set: (obj, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  },
};

const targetObject = { name: 'JavaScript', level: 'advanced' };
const proxyObject = new Proxy(targetObject, handler);

proxyObject.name;  
proxyObject.level = 'expert';  
print(proxyObject.nonExistentProperty);  

 
consumeGenerator(dataGenerator());
