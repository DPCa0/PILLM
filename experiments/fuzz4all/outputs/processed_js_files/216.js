 
async function fetchData(url) {
  try {
     
    const response = await fetch(url);
    const data = await response.json();

     
    const { userId, title } = data;

     
    print(`User ID: ${userId}, Title: ${title}`);

     
    const uniqueSet = new Set([userId, title]);

     
    const mappedArray = [...uniqueSet].map(value => `Value: ${value}`);

     
    print(...mappedArray);

     
    const emphasize = (strings, ...values) => 
      strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
    
    print(emphasize`The user ID is ${userId} and the title is ${title}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessed property "${property}"`);
    return target[property];
  }
};

 
const proxyFetchData = new Proxy(fetchData, handler);

 
proxyFetchData('https://jsonplaceholder.typicode.com/todos/1');
