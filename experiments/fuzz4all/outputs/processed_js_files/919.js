 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: 'Example data from API' });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    if (prop === 'safeData') {
      return target.data || 'No data available';
    }
    return target[prop];
  },
  set: (target, prop, value) => {
    if (prop === 'data') {
      print(`Setting data to: ${value}`);
      target[prop] = value;
      return true;
    }
    return false;
  }
};

 
const main = async () => {
  const apiData = { data: null };

   
  const proxyData = new Proxy(apiData, handler);

  try {
     
    const response = await fetchData('https://api.example.com/data');
    proxyData.data = response.data;
  } catch (error) {
    console.error('Fetch error:', error);
  }

  print('Accessing safeData:', proxyData.safeData);
};

main();
