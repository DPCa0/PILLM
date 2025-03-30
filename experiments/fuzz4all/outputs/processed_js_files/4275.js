 
async function fetchDataAndProcess() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    
     
    const [firstPost, ...otherPosts] = data;
    
     
    print(`First post title: ${firstPost?.title}`);
    
     
    const postTitles = otherPosts.map(post => post.title);
    
     
    print(`Total posts processed: ${postTitles.length + 1}`);
    
     
    const uniqueTitles = new Set(postTitles);
    
     
    for (const title of uniqueTitles) {
      print(`Unique Title: ${title}`);
    }
  } catch (error) {
     
    console.error('Error fetching or processing data');
  }
}

 
const handler = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return (...args) => {
        print(`Calling method: ${property}`);
        return target[property](...args);
      };
    }
    return target[property];
  }
};

 
const proxiedFetch = new Proxy({ fetchDataAndProcess }, handler);

 
proxiedFetch.fetchDataAndProcess();
