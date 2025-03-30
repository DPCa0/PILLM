 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('URL not provided');
      }
    }, 1000);
  });
};

 
async function processData(url) {
  try {
    const data = await fetchData(url);
    print(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
function* generateIds() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGenerator = generateIds();

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  },
  set: (target, property, value) => {
    if (typeof value === 'number' && value >= 0) {
      print(`Property '${property}' set to ${value}`);
      target[property] = value;
      return true;
    } else {
      console.warn(`Invalid value '${value}' for property '${property}'`);
      return false;
    }
  },
};

const dataObject = new Proxy({ id: idGenerator.next().value, count: 0 }, handler);

 
processData('https://example.com');
print(`Generated ID: ${dataObject.id}`);
dataObject.count = 42;
print(`Current count: ${dataObject.count}`);
dataObject.count = -10;  
