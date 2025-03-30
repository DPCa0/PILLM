 
(async () => {
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  const targetObject = {
    name: 'JavaScript',
    type: 'Programming Language',
  };

  const handler = {
    get: (obj, prop) => {
      if (prop === 'type') {
        return `${obj[prop]} (dynamic)`;
      }
      return obj[prop];
    },
  };

  const proxyObject = new Proxy(targetObject, handler);

   
  async function* fetchData(urls) {
    for (const url of urls) {
      const response = await axios.get(url);
      yield response.data;
    }
  }

   
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  const [firstUrl, secondUrl] = urls;

  print(`Fetching data from: ${firstUrl} and ${secondUrl}`);
  print(`Target Object Type: ${proxyObject.type}`);

   
  for await (const data of fetchData(urls)) {
    print('Fetched Data:', data);
  }

   
  const set = new Set([1, 2, 3, 4, 5]);
  const arrayFromSet = [...set];

  print('Array from Set:', arrayFromSet);

   
  const user = {
    profile: {
      name: 'Alice',
    },
  };

  const userName = user?.profile?.name ?? 'Anonymous';
  print(`User Name: ${userName}`);
})();
