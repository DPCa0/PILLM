 

 
const fetchData = (resource) => {
  const data = {
    users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
    posts: [{ id: 1, title: 'Async Await in JS' }, { id: 2, title: 'Destructuring Arrays' }]
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data[resource]) {
        resolve(data[resource]);
      } else {
        reject(`Resource ${resource} not found`);
      }
    }, 1000);
  });
};

 
const getResource = async (resource) => {
  try {
    const response = await fetchData(resource);
    print(`Fetched ${resource}:`, response);
    return response;
  } catch (error) {
    console.error(`Error fetching ${resource}:`, error);
  }
};

 
const displayUserDetails = async () => {
  const users = await getResource('users');
  if (users) {
    for (const { id, name } of users) {
      print(`User ID: ${id}, Name: ${name}`);
    }
  }
};

 
(async () => {
  await displayUserDetails();
  const posts = await getResource('posts');
  if (posts) {
    const [{ title: firstPostTitle }, { title: secondPostTitle }] = posts;
    print(`First Post: ${firstPostTitle}`);
    print(`Second Post: ${secondPostTitle}`);
  }
})();
