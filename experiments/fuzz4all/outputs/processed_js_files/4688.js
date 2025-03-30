 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: { id: 1, name: 'Item 1', value: 100 } });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
};

const main = async () => {
  try {
    const url = 'https://api.example.com/data';
    const response = await fetchData(url);
    
    const dataHandler = {
      get: (obj, prop) => {
        print(`Accessed property: ${prop}`);
        return prop in obj ? obj[prop] : 'Property not found';
      },
      set: (obj, prop, value) => {
        print(`Set property: ${prop} to ${value}`);
        obj[prop] = value;
        return true;
      }
    };

    const { data } = response;
    const proxiedData = new Proxy(data, dataHandler);

    const { id, name, value } = proxiedData;
    print(`ID: ${id}, Name: ${name}, Value: ${value}`);

    proxiedData.value = 200;
    print(`Updated Value: ${proxiedData.value}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

main();
