 
const fetchAndProcessData = async (url) => {
  try {
     
    const response = await fetch(url);
     
    const data = await response.json();

     
    const { title, body } = data;

     
    print(`Title: ${title}\nBody: ${body}`);

     
    const uniqueProperty = Symbol('unique');
    const obj = { [uniqueProperty]: 'This is unique!' };

     
    const handler = {
      get: (target, property) => {
        print(`Property "${property.toString()}" was accessed.`);
        return target[property];
      },
    };
    const proxyObj = new Proxy(obj, handler);

     
    print(proxyObj[uniqueProperty]);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

 
const sampleUrl = 'https://jsonplaceholder.typicode.com/posts/1';

 
fetchAndProcessData(sampleUrl);
