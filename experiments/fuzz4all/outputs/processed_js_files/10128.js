 

const fetchData = async (url) => {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return await response.json();
};

const dataHandler = {
   
  get: (target, property) => {
    print(`Accessing property ${property}`);
    return Reflect.get(target, property);
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    return Reflect.set(target, property, value);
  },
};

(async () => {
   
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const data = await fetchData(url);

     
    const proxyData = new Proxy(data, dataHandler);

     
    const { userId, title, body } = proxyData;

    print(`Post by User ${userId}: "${title}"`);
    print(`Body: ${body}`);

     
    proxyData.title = 'Updated Title';

     
    print(`Updated Post Title: "${proxyData.title}"`);

  } catch (error) {
    console.error('Error:', error);
  }
})();
