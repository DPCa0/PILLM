 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

 
(async () => {
  try {
    const { data } = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    
     
    const formatData = ({ title, body }, prefix = 'Post') => {
      return `${prefix}: ${title}\nContent: ${body}`;
    };

     
    const dataMap = new Map();
    const dataSet = new Set();

    dataMap.set('post', data);
    dataSet.add(data.userId);

    [...dataMap.entries()].forEach(([key, value]) => {
      print(`${key.toUpperCase()} - ${formatData(value)}`);
    });

    [...dataSet].forEach(userId => {
      print(`User ID: ${userId}`);
    });

     
    const handler = {
      get(target, property) {
        if (property in target) {
          return target[property];
        }
        return `Property ${property} not found`;
      }
    };

    const proxyData = new Proxy(data, handler);
    print(proxyData.title);
    print(proxyData.nonExistentProperty);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
