 

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing ${property}: ${target[property]}`);
      return target[property];
    } else {
      print(`Property ${property} not found`);
      return undefined;
    }
  },
};

 
async function fetchDataAndProxy(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const proxyData = new Proxy(data, handler);

     
    print(proxyData.userId);
    print(proxyData.title);

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const testUrl = 'https://jsonplaceholder.typicode.com/posts/1';

 
fetchDataAndProxy(testUrl);
