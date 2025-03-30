 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: 'Some fetched data' });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
const dataHandler = {
  get: (target, prop, receiver) => {
    print(`Property '${prop}' accessed.`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' set to '${value}'.`);
    target[prop] = value;
    return true;
  },
};

 
const dataObject = new Proxy({}, dataHandler);

 
async function processData() {
  try {
    print('Fetching data...');
    const response = await fetchData('https://api.example.com/data');
    
    print('Data fetched:', response.data);
    dataObject.fetchedData = response.data;
    
    print('Processing data...');
    dataObject.processedData = response.data.toUpperCase();
    print('Processed Data:', dataObject.processedData);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

 
processData();
