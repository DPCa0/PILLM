 
 

const apiSimulator = (endpoint) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === 'users') {
        resolve([
          { id: 1, name: 'Alice', age: 28 },
          { id: 2, name: 'Bob', age: 23 },
          { id: 3, name: 'Charlie', age: 31 }
        ]);
      } else if (endpoint === 'posts') {
        resolve([
          { userId: 1, title: 'Hello, world!' },
          { userId: 2, title: 'Learning ES6+' },
          { userId: 3, title: 'Advanced JavaScript' }
        ]);
      } else {
        reject('Endpoint not found');
      }
    }, 1000);
  });
};

const getUserData = async () => {
  try {
     
    const [users, posts] = await Promise.all([apiSimulator('users'), apiSimulator('posts')]);

     
    const usersWithPosts = users.map(user => {
      const { id, name, ...rest } = user;
      const userPosts = posts.filter(post => post.userId === id);
      return { id, name, ...rest, posts: userPosts };
    });

     
    const summary = usersWithPosts.reduce((acc, { name, posts }) => {
      acc += `${name} has ${posts.length} posts.\n`;
      return acc;
    }, 'User Post Summary:\n');
    
    print(summary);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

getUserData();
