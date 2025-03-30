 

 
const mockFetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = {
        '/api/user': { id: 1, name: 'John Doe' },
        '/api/posts': [
          { id: 1, title: 'Post One', content: 'Lorem ipsum' },
          { id: 2, title: 'Post Two', content: 'Dolor sit amet' },
        ]
      };
      const data = mockData[url];
      data ? resolve(data) : reject('404 Not Found');
    }, 1000);
  });
};

 
const fetchUserData = async () => {
  try {
    const user = await mockFetchData('/api/user');
    print('User fetched:', user);

    const posts = await mockFetchData('/api/posts');
    print('Posts fetched:', posts);

     
    const userProfile = { ...user, posts };
    print('User Profile:', userProfile);

     
    const postTitles = posts.map(post => post.title).join(', ');
    print('Post Titles:', postTitles);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
print(`Starting data fetch at ${new Date().toLocaleTimeString()}`);
fetchUserData();

 
const handler = {
  get: (obj, prop) => {
    return prop in obj ? obj[prop] : `No such property as '${prop}'`;
  }
};

const dynamicObj = new Proxy({ name: 'Proxy Object', type: 'Demo' }, handler);
print(dynamicObj.name);  
print(dynamicObj.nonExistent);  
