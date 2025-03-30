 
async function fetchDataAndProcess() {
  try {
     
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let posts = await response.json();

     
    let [firstPost, secondPost, ...otherPosts] = posts;

     
    print(`First Post: ${firstPost.title}, Second Post: ${secondPost.title}`);
    
     
    let postTitles = otherPosts.map(post => post.title).filter(title => title.includes('qui'));

     
    let uniqueTitles = new Set(postTitles);

     
    let validator = {
      set: function(obj, prop, value) {
        if (prop === 'title' && value.length > 50) {
          throw new Error('Title is too long');
        }
        obj[prop] = value;
        return true;
      }
    };

    let postProxy = new Proxy(firstPost, validator);

     
    try {
      postProxy.title = "This title is exceptionally long and should trigger an error because it exceeds the fifty character limit.";
    } catch (error) {
      console.error(error.message);
    }

     
    print('Unique Titles:', [...uniqueTitles]);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
fetchDataAndProcess();
