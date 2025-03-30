 

 
const fakeApiCall = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: { message: 'Hello from API!', code: 200 }, extraInfo: { timestamp: Date.now() } });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
};

 
const fetchData = async (url) => {
  try {
     
    const { data: { message }, extraInfo } = await fakeApiCall(url);

     
    const handler = {
      get: (target, prop) => {
        print(`Property '${prop}' accessed`);
        return target[prop];
      }
    };

    const proxyExtraInfo = new Proxy(extraInfo, handler);
    print(message);  
    print(`Fetched at: ${new Date(proxyExtraInfo.timestamp)}`);  

     
    const newInfo = { ...proxyExtraInfo, additionalData: 'Proxy test' };
    print('Combined Info:', newInfo);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
fetchData('https://example.com/api');
