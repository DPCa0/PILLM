 

const apiProxyHandler = {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return async function(endpoint = '') {
        const response = await fetch(`${target.baseURL}/${prop}/${endpoint}`);
        if (!response.ok) {
          throw new Error(`Error fetching ${prop}: ${response.statusText}`);
        }
        return response.json();
      };
    }
  }
};

const apiFetcher = new Proxy({ baseURL: 'https://jsonplaceholder.typicode.com' }, apiProxyHandler);

(async function() {
  try {
     
    const users = await apiFetcher.users();
    print('Users:', users);

     
    const userId = users[0]?.id;
    const posts = await apiFetcher.posts(`?userId=${userId}`);
    print('Posts:', posts);

     
    const postId = posts[0]?.id;
    const comments = await apiFetcher.comments(`?postId=${postId}`);
    print('Comments:', comments);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
