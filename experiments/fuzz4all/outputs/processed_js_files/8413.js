 
(async () => {
  const { promises: fs } = await import('fs');

   
  const target = { secret: 42 };
  const handler = {
    get: (obj, prop) => {
      print(`Property '${prop}' has been accessed.`);
      return obj[prop];
    }
  };
  const proxy = new Proxy(target, handler);

   
  async function* fetchData() {
    const data = await fs.readFile('data.txt', 'utf8');
    for (const line of data.split('\n')) {
      yield line;
    }
  }

   
  (async () => {
    try {
       
      print(proxy?.secret);

       
      print(null ?? 'This is a default value');

       
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      print(posts[0]?.title ?? 'No title available');

       
      for await (const line of fetchData()) {
        print(line);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  })();
})();
