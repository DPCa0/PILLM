 
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function createLoggingProxy(data) {
  return new Proxy(data, {
    get(target, property) {
      print(`Accessed property: ${property}`);
      return target[property];
    }
  });
}

 
function* chunkData(data, chunkSize) {
  for (let i = 0; i < data.length; i += chunkSize) {
    yield data.slice(i, i + chunkSize);
  }
}

 
(async () => {
  const data = await fetchData();
  if (!data) return;

  const loggingProxy = createLoggingProxy(data);

   
  const { 0: firstPost, ...rest } = loggingProxy;
  print('First Post:', firstPost);

   
  const title = firstPost?.title ?? 'No title';
  print('Title:', title);

   
  const chunkSize = 10;
  const dataChunks = chunkData(loggingProxy, chunkSize);

  for (let chunk of dataChunks) {
    print('Processing chunk of size:', chunk.length);
    chunk.forEach(post => print(`Post ID: ${post.id}`));
  }
})();
