 

const fetchData = async () => {
  try {
     
    const dataPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, name: "Alice" },
          posts: [
            { id: 101, title: "Post 1" },
            { id: 102, title: "Post 2" }
          ]
        });
      }, 1000);
    });

     
    const { user, posts } = await dataPromise;

     
    const processedPosts = await Promise.all(posts.map(async (post) => {
       
      const enrichedPost = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            ...post,
            author: user.name,
            content: "Lorem ipsum dolor sit amet."
          });
        }, 500);
      });
      return enrichedPost;
    }));

     
    processedPosts.forEach(post => console.log(
      `Post: ${post.title}\nAuthor: ${post.author}\nContent: ${post.content}\n`
    ));

  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};

fetchData();
