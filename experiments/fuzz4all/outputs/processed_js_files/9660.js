 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
const loggingProxy = (obj) => new Proxy(obj, {
  get(target, prop) {
    print(`Accessed property "${prop}" with value: ${target[prop]}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Set property "${prop}" to value: ${value}`);
    target[prop] = value;
    return true;
  }
});

 
async function* processData(url) {
  try {
    const data = await fetchData(url);
    yield* data.map(item => loggingProxy(item));  
  } catch (error) {
    console.error('Error:', error);
  }
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const dataGenerator = processData(url);

   
  for await (const post of dataGenerator) {
    const enhancedPost = {
      ...post,
      summary: `${post.title.substring(0, 20)}...`  
    };
    print(enhancedPost);

     
    await Promise.all([
      new Promise(res => setTimeout(res, 100)),  
      new Promise(res => setTimeout(res, 100))
    ]);
  }
})();
