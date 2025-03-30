 

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

 
const fetchData = async (url) => {
  if (url !== 'https://api.example.com/data') {
    throw new NetworkError('Invalid URL');
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { id: 1, value: 'sample data' } });
    }, 1000);
  });
};

 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      return Reflect.get(target, property, receiver);
    } else {
      return `No property named ${property}`;
    }
  },
  set(target, property, value, receiver) {
    if (property === 'data') {
      throw new Error('Cannot overwrite data');
    }
    return Reflect.set(target, property, value, receiver);
  }
};

 
(async () => {
  try {
    const url = 'https://api.example.com/data';
    const response = await fetchData(url);

    const proxyData = new Proxy(response, handler);

    print(proxyData.data);  
    print(proxyData.nonExistentProperty);  

    proxyData.data = { id: 2 };  
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('Failed to fetch data:', error.message);
    } else {
      console.error('An error occurred:', error);
    }
  }
})();
