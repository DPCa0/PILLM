 

const fetchData = async (url) => {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const dataHandler = {
   
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  },
};

const processData = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const rawData = await fetchData(url);
    
     
    const proxyData = new Proxy(rawData, dataHandler);

     
    print(`Title: ${proxyData.title}`);
    print(`Completed: ${proxyData.completed}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

 
(async () => {
  await processData();
})();
