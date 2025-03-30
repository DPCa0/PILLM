 
const fetchData = async (url) => {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

 
const mapAsync = async (array, callback) => {
  return Promise.all(array.map(callback));
};

 
function* numberGenerator(limit) {
  let count = 0;
  while (count < limit) {
    yield count++;
  }
}

 
const handler = {
  get: (obj, prop) => {
    print(`Accessed property: ${prop}`);
    return prop in obj ? obj[prop] : 'Property not found';
  },
};

const monitoredObject = new Proxy({ key: 'value' }, handler);

 
(async () => {
  try {
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');

     
    const titles = await mapAsync(data.slice(0, 5), async (post) => post.title);
    
     
    const gen = numberGenerator(3);
    for (let num of gen) {
      print(`Generated number: ${num}`);
    }

     
    print(monitoredObject.key);
    print(monitoredObject.nonExistentKey);

     
    print('Fetched Titles:', titles);
  } catch (error) {
    console.error('Error:', error);
  }
})();
