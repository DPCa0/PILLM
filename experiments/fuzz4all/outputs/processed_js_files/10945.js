 
import fetch from 'node-fetch';

 
(async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

     
    const titlesCombined = posts
      .filter(post => post.userId === 1)  
      .map(post => post.title)            
      .reduce((acc, title) => `${acc}, ${title}`, '');  

     
    const uniqueTitles = [...new Set(titlesCombined.split(', ').filter(title => title))];

     
    print(`Combined titles for userId 1:\n${uniqueTitles.join('\n')}`);

     
    const [firstPost, ...restPosts] = posts;  
    const extendedPost = {                   
      ...firstPost,
      summary: `${firstPost.title} - ${firstPost.body.substring(0, 50)}...`
    };

     
    const uniqueKey = Symbol('uniqueKey');
    extendedPost[uniqueKey] = 'This is a unique property';

    print('First extended post:', extendedPost);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
