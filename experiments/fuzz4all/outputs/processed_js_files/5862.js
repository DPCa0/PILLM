 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

     
    const [firstPost] = posts;
    const { title, body } = firstPost;

     
    const content = `Title: ${title}\n\nBody: ${body}\n`;

     
    await fs.writeFile('post.txt', content);

     
    const postIds = new Set(posts.map(post => post.id));
    print(`Unique Post IDs: ${[...postIds]}`);

     
    const handler = {
      get: (target, property) => {
        print(`Accessed property "${property}": ${target[property]}`);
        return target[property];
      }
    };

    const proxiedPost = new Proxy(firstPost, handler);
    print(proxiedPost.title);  

     
    const userPostMap = new Map();
    for (const post of posts) {
      if (!userPostMap.has(post.userId)) {
        userPostMap.set(post.userId, []);
      }
      userPostMap.get(post.userId).push(post.title);
    }

    print('User Post Map:', userPostMap);

  } catch (error) {
    console.error('Error:', error);
  }
})();
