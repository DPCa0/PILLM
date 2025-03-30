 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const dataObject = new Proxy({}, handler);

 
function* dataGenerator(dataArray) {
  for (const item of dataArray) {
    yield item;
  }
}

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const posts = await fetchData(url);

     
    dataObject.posts = posts;
    const firstPost = dataObject.posts[0];

     
    const postGen = dataGenerator(dataObject.posts);
    for (const post of postGen) {
      print(`Post ID: ${post.id} - Title: ${post.title}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
