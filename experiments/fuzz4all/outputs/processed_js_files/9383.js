 
import fetch from 'node-fetch';

 
(async function advancedFeaturesDemo() {
  try {
     
    const response = await fetch(`https: 
    
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

     
    const [{ title, body }, ...rest] = data;

     
    print(`First Post: ${title ?? 'Title unavailable'}\n${body ?? 'Body unavailable'}`);

     
    print(`Number of remaining posts: ${rest.length}`);

     
    const modifiedPosts = [...data, { userId: 1, id: data.length + 1, title: 'New Post', body: 'This is a new post' }];
    
     
    const titles = Array.from(new Map(modifiedPosts.map(post => [post.id, post.title])).values());
    
     
    await Promise.all(titles.map(async (title, index) => {
      print(`Title #${index + 1}: ${title}`);
      await new Promise(resolve => setTimeout(resolve, 100));  
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
