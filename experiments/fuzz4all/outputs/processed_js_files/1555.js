 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
const handler = {
  get(target, prop) {
    print(`Accessing ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
let dataStore = { items: [] };
const proxyDataStore = new Proxy(dataStore, handler);

 
(async function() {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    proxyDataStore.items = data;

     
    const dataIterator = dataGenerator(proxyDataStore.items);
    for (let i = 0; i < 5; i++) {
      const post = dataIterator.next().value;
      print(`Post ${post.id}: ${post.title}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
