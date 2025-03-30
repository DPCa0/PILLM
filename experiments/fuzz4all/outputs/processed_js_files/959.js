 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const dataHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist on the target object.`);
      return undefined;
    }
  },
  set(target, prop, value) {
    if (typeof value === 'string') {
      target[prop] = value.toUpperCase();  
    } else {
      target[prop] = value;
    }
    return true;
  },
};

const proxyData = new Proxy({}, dataHandler);

const uniqueID = Symbol('id');

const processData = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    proxyData.title = data.title;
    proxyData.completed = data.completed;

     
    proxyData[uniqueID] = data.id;

    print(proxyData.title);  
    print(proxyData[uniqueID]);  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

processData();
