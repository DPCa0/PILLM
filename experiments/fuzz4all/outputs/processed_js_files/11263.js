 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      url === 'https://api.example.com/data'
        ? resolve({ data: { value: 42 } })
        : reject(new Error('Failed to fetch data'));
    }, 1000);
  });
};

const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return target[prop];
    } else {
      throw new Error(`Property "${prop}" does not exist`);
    }
  },
};

const processData = async () => {
  try {
    print('Fetching data...');
    const response = await fetchData('https://api.example.com/data');
    const proxiedData = new Proxy(response.data, dataHandler);
    
    print(`Data fetched successfully:`, proxiedData);
    print(`Accessing data value: ${proxiedData.value}`);
    print(`Attempting to access a non-existent property:`);
    print(proxiedData.nonExistent);  
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

processData();
