 
(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

   
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Getting property '${prop}'`);
        return target[prop];
      } else {
        print(`Property '${prop}' does not exist, returning undefined`);
        return undefined;
      }
    },
  };

  try {
     
    const data = await fetchData(url);
    const proxyData = new Proxy(data, handler);

     
    print(proxyData.userId);   
    print(proxyData.nonExistentProperty);   

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
