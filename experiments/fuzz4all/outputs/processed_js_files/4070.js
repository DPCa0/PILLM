(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  const dataPromises = urls.map(fetchData);
  const results = await Promise.allSettled(dataPromises);

  const fulfilledData = results
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value);

  const processPost = ({ id, title }) => `Post ${id}: ${title}`;

  const processedPosts = fulfilledData.flatMap(data => {
    return data ? [processPost(data)] : [];
  });

   
  const target = {};
  const handler = {
    get: (obj, prop) => {
      print(`Accessing property '${prop}'`);
      return prop in obj ? obj[prop] : 'Property not found';
    },
    set: (obj, prop, value) => {
      print(`Setting property '${prop}' to '${value}'`);
      return Reflect.set(obj, prop, value);
    }
  };

  const proxy = new Proxy(target, handler);

  proxy.posts = processedPosts;

   
  const logPost = (index) => {
    print(proxy.posts?.[index] ?? 'No post available');
  };

   
  for (let i = 0; i < urls.length; i++) {
    logPost(i);
  }
})();
