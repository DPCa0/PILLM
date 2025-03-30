 
const fetchData = async (url) => {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
     
    const data = await response.json();
    
     
    const { title, userId, body } = data;
    
     
    print(`Title: ${title}\nUser ID: ${userId}\nBody: ${body}`);
    
     
    print(`Comments: ${data.comments?.length ?? 'No comments available'}`);
    
     
    const userIdSet = new Set([userId]);
    print(`Unique User IDs: ${Array.from(userIdSet)}`);
    
     
    const postPromises = [1, 2, 3].map(id => fetch(`${url}/${id}`).then(res => res.json()));
    const posts = await Promise.all(postPromises);
    
     
    const postTitles = posts.map(post => post.title);
    for (const title of postTitles) {
      print(`Post Title: ${title}`);
    }
  } catch (error) {
     
    console.error({ message: error.message, stack: error.stack });
  }
};

 
const url = String.raw`https: 
fetchData(url);
