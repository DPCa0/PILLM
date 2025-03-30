 
const fetchData = async () => {
   
  const fetchUser = () => new Promise((resolve) => setTimeout(() => resolve({ id: 1, name: 'John Doe' }), 1000));
  const fetchPosts = () => new Promise((resolve) => setTimeout(() => resolve([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]), 1000));

  try {
     
    const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);

     
    const { name } = user;
    const titles = posts.map(post => post.title);

     
    print(`User: ${name}`);
    print('Posts:');
    titles.forEach(title => print(`- ${title}`));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
