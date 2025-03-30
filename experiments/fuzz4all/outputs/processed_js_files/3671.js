 

 
(async () => {
   
  function randomDelay() {
    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * 1000);
      setTimeout(() => resolve(`Resolved after ${delay} ms`), delay);
    });
  }

   
  async function fetchData() {
    const message = await randomDelay();
    return `Data fetched: ${message}`;
  }

   
  const handler = {
    get(target, property) {
      print(`Accessing property "${property}"`);
      return target[property];
    },
  };

  const proxiedFetchData = new Proxy(fetchData, handler);

   
  const results = await Promise.all(
    [proxiedFetchData(), proxiedFetchData(), proxiedFetchData()].map(async (fetchFunc, i) => {
      const result = await fetchFunc;
      return `Result ${i + 1}: ${result}`;
    })
  );

  print('All results:', results);
})();
