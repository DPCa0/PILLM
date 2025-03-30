 

 
const fetchData = (endpoint) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        users: [
          { id: 1, name: 'Alice', age: 28 },
          { id: 2, name: 'Bob', age: 24 },
          { id: 3, name: 'Charlie', age: 32 }
        ],
        posts: [
          { userId: 1, title: 'Post 1', content: 'Content 1' },
          { userId: 2, title: 'Post 2', content: 'Content 2' },
          { userId: 3, title: 'Post 3', content: 'Content 3' }
        ]
      };
      resolve(data[endpoint]);
    }, 1000);
  });
};

 
const getUsersWithPosts = async () => {
  try {
    const users = await fetchData('users');
    const posts = await fetchData('posts');

    const usersWithPosts = users.map(user => {
      const { name, ...rest } = user;  
      const [firstPost] = posts.filter(post => post.userId === user.id);
      return {
        name,
        ...rest,  
        firstPost
      };
    });

    return usersWithPosts;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
getUsersWithPosts().then(result => print(result));
