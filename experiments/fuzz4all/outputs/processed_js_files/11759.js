 

 
import { fetchData } from './dataModule.js';

 
async function processData(url) {
  try {
     
    const data = await fetchData(url);

     
    const { users, posts } = data;

     
    const userPostsMap = new Map();

    users.forEach(user => {
      userPostsMap.set(user.id, {
        userName: user.name,
        userPosts: posts.filter(post => post.userId === user.id)
      });
    });

     
    print(userPostsMap);
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

 
processData('https://jsonplaceholder.typicode.com');

 

 
export function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({
          users: [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
          ],
          posts: [
            { userId: 1, content: 'Hello World' },
            { userId: 2, content: 'JavaScript is fun' },
            { userId: 1, content: 'Async/Await rocks' }
          ]
        });
      } else {
        reject('URL is missing');
      }
    }, 1000);
  });
}
