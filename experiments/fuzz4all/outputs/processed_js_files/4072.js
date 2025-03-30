 
const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
  return response.json();
};

const getAllData = async (urls) => {
  try {
    const fetchPromises = urls.map(fetchJSON);
    const allData = await Promise.all(fetchPromises);
    return allData.reduce((acc, data, index) => {
      acc[`data${index}`] = data;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const createDataProxy = (data) => {
  return new Proxy(data, {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing property "${prop}"`);
        return target[prop];
      } else {
        console.warn(`Property "${prop}" does not exist on target`);
      }
    },
  });
};

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
];

getAllData(urls).then((data) => {
  const dataProxy = createDataProxy(data);

   
  print(dataProxy.data0);
  print(dataProxy.data1);
  print(dataProxy.nonExistent);  
});
