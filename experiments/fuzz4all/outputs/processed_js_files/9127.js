 

 
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

 
const dataHandler = {
  get(target, property) {
    print(`Accessing property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const data = await fetchData(url);
  
  if (data) {
    const proxiedData = new Proxy(data, dataHandler);
    print(proxiedData.title);  
    proxiedData.completed = true;   
  }
})();
