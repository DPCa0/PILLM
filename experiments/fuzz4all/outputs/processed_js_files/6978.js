 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, 1000);
  });
};

 
const urlHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Fetching data from ${prop}`);
      return target[prop];
    } else {
      throw new Error(`Invalid API endpoint: ${prop}`);
    }
  }
};

const api = new Proxy(
  {
    users: 'https://api.example.com/users',
    posts: 'https://api.example.com/posts',
  },
  urlHandler
);

 
const getData = async () => {
  try {
    const results = await Promise.all([
      fetchData(api.users),
      fetchData(api.posts)
    ]);
    results.forEach(result => print(result.data));
  } catch (error) {
    console.error(error.message);
  }
};

 
(async () => {
  await getData();
})();
