 

 
function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === 'validEndpoint') {
        resolve({ data: 'Fetched data successfully!', status: 200 });
      } else {
        reject(new Error('Invalid endpoint'));
      }
    }, 1000);
  });
}

 
async function getData(endpoint) {
  try {
    const response = await fetchData(endpoint);
    print('Data received:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting ${prop} property`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value, receiver) {
    print(`Setting ${prop} property to ${value}`);
    return Reflect.set(...arguments);
  }
};

const targetObject = {
  name: 'Advanced JS',
  version: '1.0.0'
};

const proxiedObject = new Proxy(targetObject, handler);

 
proxiedObject.name = 'Advanced JavaScript Program';
print(proxiedObject.name);

 
getData('validEndpoint');
getData('invalidEndpoint');
