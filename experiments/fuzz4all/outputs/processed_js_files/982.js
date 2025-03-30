 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: { id: 1, name: 'Advanced JavaScript', features: ['async', 'await', 'proxy'] } });
      } else {
        reject('Error: URL is required');
      }
    }, 1000);
  });
};

 
const logData = ({ data: { id, name, features } }) => {
  print(`ID: ${id}, Name: ${name}`);
  print('Features:', ...features);
};

 
const logger = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting ${prop}: ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property ${prop} not found`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
(async () => {
  try {
    const url = 'https://api.example.com/data';
    const response = await fetchData(url);
    logData(response);
  } catch (error) {
    console.error(error);
  }

   
  const dataObject = { key1: 'value1', key2: 'value2' };
  const proxiedData = new Proxy(dataObject, logger);

  print(proxiedData.key1);  
  proxiedData.key3 = 'value3';  
})();
