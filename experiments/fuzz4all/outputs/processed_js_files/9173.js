 

(async function() {
   
  const fetchData = (url) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, Math.random() * 1000);
  });

   
  const urls = [
    'https://api.example.com/endpoint1',
    'https://api.example.com/endpoint2',
    'https://api.example.com/endpoint3'
  ];

   
  const createCounter = (start = 0) => {
    let count = start;
    return {
      increment: () => ++count,
      getCount: () => count
    };
  };

  const counter = createCounter();

   
  const fetchAllData = async (urls) => {
    const promises = urls.map(url => fetchData(url));
    return Promise.all(promises);
  };

  try {
    const results = await fetchAllData(urls);
    
     
    const [data1, data2, data3] = results;

    print(`Counter: ${counter.increment()}`);
    print(data1);
    print(data2);
    print(data3);
    print(`Counter after all operations: ${counter.getCount()}`);
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
