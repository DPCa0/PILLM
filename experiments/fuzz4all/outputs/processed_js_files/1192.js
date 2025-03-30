 
(async () => {
   

   
  const simulateAsyncOperation = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Data retrieved successfully');
      }, 2000);
    });
  };

   
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error: ', error);
    }
  };

   
  const dataMap = new Map();

   
  const result = await simulateAsyncOperation();
  print(result);

   
  const { results: apiData } = await fetchData('https://jsonplaceholder.typicode.com/users') || {};

   
  if (apiData) {
    apiData.forEach((user, index) => {
      dataMap.set(index, user.name);
    });

     
    for (const [key, value] of dataMap.entries()) {
      print(`User ${key + 1}: ${value}`);
    }
  }

   
  const uniqueNamesSet = new Set(dataMap.values());
  print('Unique User Names:', [...uniqueNamesSet]);
})();
