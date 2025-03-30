 
(async () => {
   
  function* transformData(data) {
    for (const item of data) {
      yield {
        ...item,
        processedAt: new Date(),
        id: item.id * 1000,
      };
    }
  }

   
  const handler = {
    get: (target, prop) => {
      print(`Accessed property ${prop}`);
      return target[prop];
    },
  };

   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  try {
    const rawData = await fetchData('https://jsonplaceholder.typicode.com/users');
    
     
    const transformedData = [...transformData(rawData)].map((item) => new Proxy(item, handler));
    
     
    const usernames = new Set(transformedData.map(user => user.username));
    
     
    print('Transformed Data:', transformedData);
    print('Unique Usernames:', usernames);
  } catch (error) {
    console.error('Error:', error);
  }
})();
