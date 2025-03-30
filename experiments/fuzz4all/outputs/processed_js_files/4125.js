 

 
async function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === 'valid') {
        resolve({ data: 'Fetched Data', timestamp: new Date() });
      } else {
        reject(new Error('Invalid endpoint'));
      }
    }, 1000);
  });
}

 
function* numberGenerator(limit) {
  for (let i = 1; i <= limit; i++) {
    yield i;
  }
}

 
const handler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

 
(async function main() {
  const endpoint = 'valid';
  try {
    const data = await fetchData(endpoint);
    print('Async Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const numbers = numberGenerator(5);
  print('Generated Numbers:');
  for (const num of numbers) {
    print(num);
  }

  const targetObj = { name: 'JavaScript', type: 'Language' };
  const proxyObj = new Proxy(targetObj, handler);
  
   
  print('Name:', proxyObj.name);
  proxyObj.version = 'ES2023';
  print('Updated Object:', proxyObj);
})();
