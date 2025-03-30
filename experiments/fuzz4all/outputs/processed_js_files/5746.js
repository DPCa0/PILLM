 

 
const fetchDataFromDB = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: 'Advanced JavaScript Features',
        tags: ['async', 'await', 'es6', 'javascript']
      });
    }, 1000);
  });
};

 
class BlogPost {
  constructor({ id, title, tags }) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  }

  displayPost() {
    print(`Post ID: ${this.id}`);
    print(`Title: ${this.title}`);
    print(`Tags: ${this.tags.join(', ')}`);
  }
}

 
async function displayBlogPost() {
  try {
    const blogData = await fetchDataFromDB();
     
    const { title, tags } = blogData;
    
     
    const enhancedTags = [...tags, 'advanced', 'code'];

     
    const blogPost = new BlogPost({ ...blogData, tags: enhancedTags });
    blogPost.displayPost();
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }
}

displayBlogPost();
