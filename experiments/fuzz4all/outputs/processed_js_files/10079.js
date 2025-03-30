 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const loggerProxy = obj => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      print(`Property '${prop}' accessed.`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      print(`Property '${prop}' set to '${value}'.`);
      return Reflect.set(target, prop, value, receiver);
    }
  });
};

 
const fetchData = async url => {
  try {
    print('Fetching data...');
    await delay(1000);  
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const processData = data => {
  const dataMap = new Map();
  data.forEach(item => {
    dataMap.set(item.id, item.name);
  });
  return dataMap;
};

 
const main = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const data = await fetchData(url);
  
  if (data) {
    const dataMap = processData(data);
    print('Processed Data:', dataMap);

     
    const proxiedData = loggerProxy(Object.fromEntries(dataMap));
    print('Access name of id 1:', proxiedData['1']);
    proxiedData['2'] = 'New Name';
  }
};

main();
