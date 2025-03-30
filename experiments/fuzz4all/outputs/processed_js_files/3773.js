 
async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  },
};

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
const ids = Array.from({ length: 5 }, () => gen.next().value);  

(async () => {
  try {
    const data = await fetchData();
    const proxiedData = new Proxy(data, handler);

     
    const [firstPost, ...rest] = proxiedData;

     
    print(`First Post Title: ${firstPost?.title}`);

     
    const wordCount = rest
      .map(post => post.body.split(' ').length)
      .reduce((total, count) => total + count, 0);

    print(`Total Word Count in Remaining Posts: ${wordCount}`);

     
    const uniqueIds = new Set([...ids, ...rest.map(post => post.id)]);
    print('Unique IDs:', [...uniqueIds]);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
