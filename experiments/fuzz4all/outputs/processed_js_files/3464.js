 

 
function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === 'validEndpoint') {
        resolve({ data: 'Fetched Data' });
      } else {
        reject('Error: Invalid Endpoint');
      }
    }, 1000);
  });
}

 
async function getData(endpoint) {
  try {
    const response = await fetchData(endpoint);
    print('Response:', response.data);
  } catch (error) {
    console.error(error);
  }
}

 
function* numberGenerator(max) {
  let num = 0;
  while (num <= max) {
    yield num++;
  }
}

 
const targetObj = { a: 1, b: 2, c: 3 };
const handler = {
  get: (target, prop) => {
    print(`Accessing property '${prop}'`);
    return target[prop];
  },
};

const proxyObj = new Proxy(targetObj, handler);

 
getData('validEndpoint');  
getData('invalidEndpoint');  

 
const gen = numberGenerator(5);
let genResult = gen.next();
while (!genResult.done) {
  print('Generated number:', genResult.value);
  genResult = gen.next();
}

 
print('Proxy access:', proxyObj.a);
print('Proxy access:', proxyObj.b);
