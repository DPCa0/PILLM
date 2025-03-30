(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
    return await response.json();
  };

   
  const processData = (data) => {
    const uniqueItems = [...new Set(data.map(item => item.id))];
    return new Map(uniqueItems.map(id => {
      const item = data.find(item => item.id === id);
      return [id, { ...item, processed: true }];
    }));
  };

   
  const validator = {
    set: (obj, prop, value) => {
      if (prop === 'id' && typeof value !== 'number') {
        throw new Error('ID must be a number');
      }
      obj[prop] = value;
      return true;
    }
  };

   
  try {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(apiURL);
    
    const processedData = processData(data);
    const protectedData = new Proxy(processedData, validator);
    
    for (let [id, item] of protectedData.entries()) {
      print(`ID: ${id} - Title: ${item.title} - Processed: ${item.processed}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
