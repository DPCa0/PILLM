 
async function fetchData(url) {
   
  const fakeFetch = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject('No URL provided');
      }
    }, 1000);
  });

  try {
    const response = await fakeFetch(url);
    print('Fetched:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist on target`);
      return () => Promise.resolve(`Default function for ${prop}`);
    }
  }
};

const apiProxy = new Proxy({
  getData: (url) => fetchData(url),
  saveData: (data) => new Promise((resolve) => setTimeout(() => resolve(`Data saved: ${data}`), 500))
}, handler);

 
(async () => {
  await apiProxy.getData('http://example.com');
  print(await apiProxy.saveData('Some important data'));
  
   
  print(await apiProxy.nonExistentMethod());
})();
