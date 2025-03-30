(async () => {
   
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   
  function* processData(data) {
    for (const item of data) {
      yield `Processed: ${JSON.stringify(item)}`;
    }
  }

   
  const handler = {
    get: (target, property) => {
      print(`Getting property "${property}"`);
      return target[property];
    },
  };

  const dataProxy = new Proxy({ message: 'Hello, Proxy!' }, handler);

   
  const fetchUrl = `https: 

   
  const data = await fetchData(fetchUrl);
  const dataIterator = processData(data);

  print(dataProxy.message);  

   
  const { value: firstProcessed } = dataIterator.next();
  print(firstProcessed);  

   
  const transformedData = new Map(data.map(user => [user.id, { ...user, active: true }]));
  
  print('Transformed Data:', transformedData.get(1));  
  
   
  print(transformedData.get(2)?.name ?? 'Name not found');

   
  const uniqueId = Symbol('id');
  print('Unique ID Symbol:', uniqueId);
})();
