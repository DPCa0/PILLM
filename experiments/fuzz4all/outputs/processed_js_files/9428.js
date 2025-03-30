 
import fs from 'fs';
import fetch from 'node-fetch';

 
async function advancedFeatures() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    
     
    const filteredPosts = data.filter(post => post.userId === 1);

     
    const outputString = `Filtered Posts:\n${filteredPosts.map(post => `Title: ${post.title}`).join('\n')}`;

     
    const firstPostTitle = filteredPosts?.[0]?.title ?? 'No title available';

    print(`First Post Title: ${firstPostTitle}`);

     
    const postSummaries = filteredPosts.map(({ id, title }) => ({ id, title }));

     
    await fs.promises.writeFile('postSummaries.json', JSON.stringify(postSummaries, null, 2));

    print('Post summaries have been written to postSummaries.json');
  } catch (error) {
     
    console.error({ errorMessage: error.message, stack: error.stack });
  }
}

 
advancedFeatures();
