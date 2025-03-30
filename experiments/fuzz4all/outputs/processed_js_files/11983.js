 
const advancedFunctionality = async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

   
  const { userId, title, completed } = await fetchData('https://jsonplaceholder.typicode.com/todos/1');

   
  const extendedData = { ...{ userId, title, completed }, timestamp: new Date() };

   
  const handler = {
    get: (obj, prop) => {
      print(`Property '${prop}' accessed`);
      return obj[prop];
    }
  };
  const proxiedData = new Proxy(extendedData, handler);

   
  print('Title:', proxiedData.title);
  print('Completed:', proxiedData.completed);
  print('Timestamp:', proxiedData.timestamp);
};

 
advancedFunctionality().catch(console.error);
