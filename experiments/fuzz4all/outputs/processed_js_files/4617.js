 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: 'Alice' },
        posts: [{ id: 101, title: 'Post 1' }, { id: 102, title: 'Post 2' }]
      });
    }, 1000);
  });
};

 
const processData = async () => {
  try {
     
    const data = await fetchData();

     
    const { user, posts } = data;

     
    print(`User: ${user.name}`);
    print('Posts:');
    posts.map(({ id, title }) => {
      print(`  - [${id}] ${title}`);
    });
  } catch (error) {
     
    console.error('An error occurred:', error);
  }
};

 
processData();
