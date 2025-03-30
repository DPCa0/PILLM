 
async function* fetchData(urls) {
  for (let url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

 
const handler = {
  get(target, prop) {
    print(`Accessing ${prop} property`);
    return prop in target ? target[prop] : `Property ${prop} does not exist`;
  },
  set(target, prop, value) {
    if (typeof value === 'string' && value.trim() !== '') {
      target[prop] = value;
      return true;
    }
    throw new Error(`Invalid value for property ${prop}`);
  }
};

 
const targetObject = {};
const proxy = new Proxy(targetObject, handler);

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

  try {
     
    for await (const { title, ...rest } of fetchData(urls)) {
      print(`Title: ${title}`);
       
      proxy.title = title;
      print(proxy.title);
    }
  } catch (error) {
    console.error(error);
  }
})();
