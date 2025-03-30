 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const transformData = (data, callback) => data.map(callback);

 
const dataHandler = {
  get(target, property) {
    print(`Getting property '${property}'`);
    return property in target ? target[property] : 'Property not found';
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

 
(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  const rawData = await fetchData(apiUrl);
  
   
  const dataProxy = new Proxy(rawData, dataHandler);

   
  const transformedData = transformData(dataProxy, post => ({ id: post.id, title: post.title }));

   
  print(dataProxy[0]);  
  dataProxy[0] = { id: 1, title: 'Updated Title' };  
  print(transformedData);
})();
