 

 
function fetchData(apiEndpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(`Data from ${apiEndpoint}`);
      } else {
        reject(new Error('Network error'));
      }
    }, 1000);
  });
}

 
async function* fetchRetry(apiEndpoint, retries) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const data = await fetchData(apiEndpoint);
      yield data;
      return;  
    } catch (error) {
      print(`Attempt ${attempt + 1} failed: ${error.message}`);
    }
  }
  throw new Error('All retries failed');
}

 
const apiHandler = {
  get(target, prop) {
    print(`Fetching from API: ${prop}`);
    return target[prop];
  }
};

const apiProxy = new Proxy({
  getUsers: 'https://api.example.com/users',
  getPosts: 'https://api.example.com/posts'
}, apiHandler);

 
(async () => {
  for await (const data of fetchRetry(apiProxy.getUsers, 3)) {
    print('Received:', data);
  }
})();
