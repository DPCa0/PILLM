 
const fetchData = async (url) => {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    let data = await response.json();

     
    const handler = {
      get: (target, property) => {
        print(`Accessing property "${property}"`);
        return target[property];
      }
    };

    const proxiedData = new Proxy(data, handler);

    return proxiedData;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const uniqueID = Symbol('id');

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const data = await fetchData(url);

  print(`Data [${uniqueID.toString()}]:`, data);

   
  print(`Generated ID: ${idGen.next().value}`);
  print(`Generated ID: ${idGen.next().value}`);

   
  const { title, body } = data;
  print(`Title: ${title}`);
  print(`Body: ${body}`);
})();
