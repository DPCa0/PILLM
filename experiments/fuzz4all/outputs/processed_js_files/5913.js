 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(endpoint) {
  print(`Fetching data from ${endpoint}...`);
  await delay(1000);  
  return { data: 'Sample Data from ' + endpoint };
}

const createEndpointProxy = (baseURL) => {
  return new Proxy({}, {
    get: (target, endpoint) => {
      return async () => {
        const response = await fetchData(`${baseURL}/${endpoint}`);
        return response.data;
      }
    }
  });
};

const api = createEndpointProxy('https://api.example.com');

 
(async () => {
  try {
    const userData = await api.users();
    print('User Data:', userData);

    const postData = await api.posts();
    print('Post Data:', postData);

    const commentData = await api.comments();
    print('Comment Data:', commentData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
