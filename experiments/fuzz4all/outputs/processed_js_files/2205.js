 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
  }
};

 
const handler = {
  set: function (obj, prop, value) {
    print(`Property ${prop} set to ${value}`);
    obj[prop] = value;
    return true;
  },
};

const target = {};
const proxy = new Proxy(target, handler);

 
function* arrayGenerator(arr) {
  for (let item of arr) {
    yield item;
  }
}

 
const main = async () => {
  const apiURL = 'https://jsonplaceholder.typicode.com/posts';
  const posts = await fetchData(apiURL);

   
  proxy.title = 'Latest Posts';

  if (posts) {
     
    const postGenerator = arrayGenerator(posts);
    let current = postGenerator.next();
    
     
    while (!current.done) {
      print(`Post ID: ${current.value.id} - Title: ${current.value.title}`);
      current = postGenerator.next();
    }
  }
};

 
main();
