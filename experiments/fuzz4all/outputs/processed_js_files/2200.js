 
const fetchData = async () => {
  try {
     
    const [user, posts, comments] = await Promise.all([
      Promise.resolve({ id: 1, name: 'John Doe' }),  
      Promise.resolve([{ id: 101, title: 'Post 1' }, { id: 102, title: 'Post 2' }]),  
      Promise.resolve([{ postId: 101, text: 'Nice post!' }, { postId: 101, text: 'Thanks for sharing!' }]),  
    ]);

     
    const { id: userId, name } = user;
    const [{ title: firstPostTitle }, { title: secondPostTitle }] = posts;

     
    const getCommentsForPost = (postId) => comments.filter(({ postId: pid }) => pid === postId);

     
    const commentsMap = new Map();
    posts.forEach(({ id, title }) => {
      commentsMap.set(title, getCommentsForPost(id).map(({ text }) => text));
    });

     
    print(`User: ${name}`);
    print(`Comments for "${firstPostTitle}":`, commentsMap.get(firstPostTitle));
    print(`Comments for "${secondPostTitle}":`, commentsMap.get(secondPostTitle));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
fetchData();
